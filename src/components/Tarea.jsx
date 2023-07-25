import {  useState } from "react";
import { formatearFecha } from "../helpers";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

function Tarea({tarea}) {
    const { nombre, _id, descripcion, prioridad, fechaEntrega, estado} = tarea;
    
    
    const {  obtenerProyecto, eliminarTarea, handleModalEditarTarea, MySwal, completarTarea }= useProyectos();
    
    const admin = useAdmin();

    const params = useParams();
    // destructuring del id y asignandolo a la variable proyectoID
    const { id:proyectoID } = params;

    let colorPrioridad;
    
    function definirColorPrioridad(prioridad){
        let clase
        
        if(prioridad == "Baja"){
            clase = "bg-yellow-200 text-yellow-600"
        }
        
        if(prioridad == "Media"){
            clase = "bg-orange-200 text-orange-600"
        }

        if(prioridad == "Alta"){
            clase = "bg-red-200 text-red-600"
        }
        return clase
    }
    colorPrioridad = definirColorPrioridad(prioridad);

   
   

    async function handleEliminar(){
        
        MySwal.fire({
            title: '¿Estas seguro que deseas eliminar la tarea?',
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
                eliminarTarea(tarea)

                //  Alerta proyecto eliminado
                await MySwal.fire(
                    '¡Listo!',
                    'Tarea eliminada correctamente',
                    'success',
                    
                )
                // actualice la pagina
                // obtenerProyecto(proyectoID)
            }
          })
    }

  return (
    <div className="bg-white p-5 rounded mb-2 flex flex-col items-start md:flex-row md:justify-between md:items-center">
        <div className="w-64 flex-1">
            <p className="font-bold capitalize my-2 text-lg text-gray-600">{nombre}</p>
            <p className=" text-gray-500 text-sm">{descripcion}</p>
        </div>
        <p className="my-2 capitalize flex-1 text-gray-500 text-sm"><span className="md:hidden font-bold">Fecha de entrega: </span>{formatearFecha(fechaEntrega)}</p>
        <div className="flex gap-2 items-center mt-2">
            <p className="capitalize font-bold md:hidden text-gray-500 text-sm">Prioridad:</p>
            <p className={`${colorPrioridad}  font-bold py-1 px-4 text-sm rounded-full`}> {prioridad}</p>
        </div>
        <div className="mt-5 flex-1 flex gap-2 self-end md:justify-end md:self-center items-center">
            {estado ? <p className="text-right text-xs text-gray-600">Completado por: <span className="block font-bold">{tarea.completado.nombre}</span> </p>: null}
            <button 
                onClick={()=> { 
                    completarTarea(_id)
                    
                }}
                className={estado ? `bg-green-200 hover:bg-green-500 hover:text-white p-2 text-green-500 rounded-lg` : `bg-yellow-200 hover:bg-yellow-500 hover:text-white p-2 text-yellow-500 rounded-lg`}>
                {estado ? 'Completa' : 'Incompleta'}
            </button>
            
            {
                admin && (
                    <>
                        <button 
                            className='bg-rose-200 hover:bg-rose-500 hover:text-white p-2 text-rose-500 rounded-lg'
                            onClick={handleEliminar}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <button 
                            className='bg-indigo-200 hover:bg-indigo-500 hover:text-white p-2 text-indigo-500 rounded-lg'
                            onClick={()=> handleModalEditarTarea(tarea)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default Tarea