import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const ModalFormularioTarea = () => {
    
    const [ id, setId ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ descripcion, setDescripcion ] = useState("");
    const [ prioridad, setPrioridad ] = useState("");
    const [ fechaEntrega, setFechaEntrega ] = useState("");
    const [ alerta, setAlerta ] = useState({});

    const PRIORIDAD = ['Baja', 'Media', 'Alta'];

    const {   tarea, modalFormularioTarea, handleModalTarea, submitTarea, MySwal, obtenerProyecto} = useProyectos();
    const params = useParams();
    const {id:proyecto} = params;

    useEffect(() => {
        if(tarea?._id){
            setId(tarea._id)
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setPrioridad(tarea.prioridad)
            setFechaEntrega(tarea.fechaEntrega?.split('T')[0])
            return 
        }
        setId("")
        setNombre("");
        setDescripcion("");
        setPrioridad("");
        setFechaEntrega("")
     
    }, [tarea]);
    console.log(tarea)



    async function handleSubmit(e){
        e.preventDefault();
        //  Validaciones
        if([nombre, descripcion, prioridad, fechaEntrega].includes("")){
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            setTimeout(()=>{
                setAlerta({})
            }, 3000)
            return
        }

        //  Almacenar la tarea
        await submitTarea({ id, nombre, descripcion, prioridad, fechaEntrega, proyecto})
        

        //  Resetear campos
        setId("")
        setNombre("");
        setDescripcion("");
        setPrioridad("");
        setFechaEntrega("")

        // Mostrar alerta de tarea creada
        await MySwal.fire({
            position: 'center',
            icon: 'success',
            title: `Tarea ${id ? "actualizada" : "creada"} correctamente`,
            showConfirmButton: false,
            timer: 1500
        })

        //  Cerrar el modal
        handleModalTarea();
        // Actualizar los proyectos
        // obtenerProyecto(proyecto);
    }

    const { msg } = alerta;


    return (
        <Transition.Root show={ modalFormularioTarea } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalTarea }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:bg-rose-500 hover:text-white"
                                    onClick={ handleModalTarea }
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-2xl leading-6 font-bold text-gray-900">
                                       {
                                        id ? "Editar tarea" : "Nueva tarea"
                                       }
                        
                                    </Dialog.Title>
                                    <form className='my-10' onSubmit={handleSubmit}>
                                        <div className='mb-5'>
                                            <label 
                                                className="block text-gray-700 uppercase font-bold text-sm" 
                                                htmlFor="nombre"
                                            >Nombre:</label>
                                            <input 
                                                value={nombre}
                                                onChange={(e)=> setNombre(e.target.value)}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg" 
                                                type="text" 
                                                id='nombre' 
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label 
                                                className="block text-gray-700 uppercase font-bold text-sm" 
                                                htmlFor="descripcion"
                                            >descripcion:</label>
                                            <textarea 
                                                value={descripcion}
                                                onChange={(e)=> setDescripcion(e.target.value)}
                                                id="descripcion"
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label 
                                                className="block text-gray-700 uppercase font-bold text-sm" 
                                                htmlFor="fecha-entrega"
                                            >Fecha de entrega:</label>
                                            <input 
                                                value={fechaEntrega}
                                                onChange={(e)=> setFechaEntrega(e.target.value)}
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg" 
                                                type="date" 
                                                id='fecha-entrega' 
                                            />
                                        </div>
                                        <div className='mb-5'>
                                            <label 
                                                className="block text-gray-700 uppercase font-bold text-sm" 
                                                htmlFor="prioridad"
                                            >prioridad:</label>
                                            <select 
                                                value={prioridad}
                                                onChange={(e)=> setPrioridad(e.target.value) }
                                                name="prioridad" 
                                                id="prioridad"
                                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                                            >  
                                                <option value="" disabled>--Seleccionar</option>
                                                {
                                                    PRIORIDAD.map((item)=> <option key={item} value={item}>{item}</option>)
                                                }
                                                
                                            </select>
                                        </div>
                                        <input 
                                            type="submit"
                                            value={ id ? "Guardar Cambios" : 'Crear Tarea'}    
                                            className="bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white text-center p-2 font-bold w-full block"
                                        />
                                        {
                                            msg && <Alerta alerta={alerta}/>
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea