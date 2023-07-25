import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import Fondo from '../components/Fondo';
import Tarea from '../components/Tarea';
import Colaborador from '../components/Colaborador';
import useAdmin from '../hooks/useAdmin';
import io from 'socket.io-client'
let socket;


function Proyecto() {

    
    const navigate = useNavigate();
    const params = useParams();
    // destructuring del id y asignandolo a la variable proyectoID
    const { id:proyectoID } = params;
    const{   submitTareasProyecto, obtenerProyecto, proyecto, cargando, MySwal, eliminarProyecto, handleModalTarea } = useProyectos();
    

    useEffect(()=>{
        obtenerProyecto(proyectoID);
    }, []);
    
    useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL);
        socket.emit('abrir proyecto', params.id);
    }, []);

    useEffect(()=>{
        socket.on('tarea agregada', (tareaNueva)=>{
            if(tareaNueva.proyecto === proyecto._id){
                submitTareasProyecto(tareaNueva)
            }
            
        })
        
    })
    
    

    const admin = useAdmin();   

    async function handleEliminar(){
        

        MySwal.fire({
            title: '¿Estas seguro que deseas eliminar el proyecto?',
            text: "¡No podrás revertir esto.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366F1',
            cancelButtonColor: '#F43F5E',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'cancelar',
            
          }).then( async (result) => {
            if (result.isConfirmed) {

                // Eliminar proyecto
                eliminarProyecto(proyectoID)

                //  Alerta proyecto eliminado
                await MySwal.fire(
                    '¡Eliminado!',
                    'El proyecto ha sido eliminado',
                    'success',
                    
                )
                navigate('/proyectos')
            }
          })
    }

    async function handleNuevaTarea(){
        handleModalTarea()
    }




  return (
    cargando ? <Spinner/> : (
        <>
            <div className=' flex gap-2 md:gap-5 justify-between items-center'>
                <h1 className='font-bold text-lg md:text-3xl lg:text-6xl capitalize text-gray-800'>
                    {proyecto.nombre}
                </h1>
                <div  className='flex gap-2'>
                    {
                        admin && (
                            <>
                                <div className='bg-rose-200 hover:bg-rose-500 hover:text-white p-2 text-rose-500 rounded-lg'>
                                    <button onClick={ handleEliminar }>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                                <div className='bg-indigo-200 hover:bg-indigo-500 hover:text-white p-2 text-indigo-500 rounded-lg'>
                                    <Link
                                        to={`/proyectos/editar/${params.id}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                </div>
                                <div className='bg-sky-200 hover:bg-sky-800 hover:text-white p-2 text-sky-500 rounded-lg'>
                                    <button onClick={ handleNuevaTarea }>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )
                    }
                   
                </div>


                <ModalFormularioTarea />
            </div>
        
        <div className='mt-10'>
            {/* {<p className='mb-5 text-slate-600 leading-7'>{proyecto.descripcion}</p>} */}
            <p className='my-5 font-bold text-lg md:text-2xl  capitalize text-gray-800'>Tareas del proyecto</p>
            <div id='contenedor-tareas-colaboradores' className='py-3'>
                <div className=''>
                    {
                        proyecto.tareas?.length ? (
                            <div className='px-5 hidden md:flex justify-around bg-white  text-center p-2 mb-2 font-bold text-gray-500 capitalize'>
                                <p className=''>Nombre y descripcion</p>
                                <p className=''>fecha de entrega</p>
                                <p className=''>prioridad</p>
                                <p className=''>acciones</p>
                            </div>
                        ): null
                    }
                    <div className='max-h-[600px] overflow-y-auto'>
                    {
                        proyecto.tareas?.length ? (proyecto.tareas?.map((tarea)=>{
                                return <Tarea key={tarea._id} tarea={tarea}/>
                            })
                        ): <Fondo texto={"No hay tareas aún"}/>
                    }
                    </div>
                    {
                        admin && (
                            <>
                                <div className='flex items-center justify-between mt-10 mb-5'>
                                    <p className='font-bold text-lg md:text-2xl  capitalize text-gray-800'>Colaboradores</p>
                                    <Link
                                        className='bg-sky-200 hover:bg-sky-800 hover:text-white p-2 text-sky-500 rounded-lg'
                                        to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                        </svg>

                                    </Link>
                                </div>
                                <div className='max-h-[600px] overflow-y-auto'>
                                {
                                    proyecto.colaboradores?.length ? (proyecto.colaboradores?.map((colaborador)=>{
                                            return <Colaborador key={colaborador._id} colaborador={colaborador}/>
                                        })
                                    ): <Fondo texto={"No hay colaboradores aún"}/>
                                }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
        
        </>
    )
  )
}

export default Proyecto