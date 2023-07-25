import { useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos";
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router-dom";



function FormularioProyecto() {
    const [ nombre, setNombre ] = useState("");
    const [ descripcion, setDescripcion ] = useState("");
    const [ fechaEntrega, setFechaEntrega ] = useState("");
    const [ cliente, setCliente ] = useState("");
    const [ id, setId ] = useState(null);
    
    const { MySwal, submitProyecto, proyecto } = useProyectos();
    const navigate = useNavigate();
    const [ titleAlert, setTitleAlert ] = useState("");


    const params = useParams();
    
    useEffect(()=>{
        if(params.id){
            
            // Editando
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
            setTitleAlert("Proyecto Actualizado correctamente")

        }else{

            // Nuevo Proyecto
            setTitleAlert("Proyecto creado correctamente")
        }
    }, [params]);

    // state para manejo de errores
    const [ nombreError, setNombreError ] = useState(false);
    const [ descripcionError, setDescripcionError ] = useState(false);
    const [ fechaEntregaError, setfechaEntregaError ] = useState(false);
    const [ clienteError, setClienteError ] = useState(false);
   
    
    async function handleSubmit(e){
        e.preventDefault();
        
        // Validaciones
        if(!nombre){
            setNombreError(true)
        }else{
            setNombreError(false)
        }
        
        if(!descripcion){
            setDescripcionError(true)
        }else{
            setDescripcionError(false)
        }

        if(!fechaEntrega){
            setfechaEntregaError(true)
        }else{
            setfechaEntregaError(false)
        }

        if(!cliente){
            setClienteError(true)
        }else{
            setClienteError(false)
        }
        
        if(!nombre || !descripcion || !fechaEntrega || !cliente){
            return
        }
       
        // Crear proyecto
        await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente})
        
        // Alerta de proyecto creado
        MySwal.fire({
            position: 'center',
            icon: 'success',
            title: titleAlert,
            showConfirmButton: false,
            timer: 1500
        })
        
        // Resetear los campos
        setNombre("");
        setDescripcion("");
        setFechaEntrega("");
        setCliente("");
        setId(null)

        setTimeout(() => {
            navigate('/proyectos')
        }, 3000);
    
    }



  return (
    <form onSubmit={handleSubmit} action="#" className="shadow-md bg-white py-10 px-5 rounded-lg lg:w-1/3">
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"  
                htmlFor="nombre"
            >nombre del proyecto:</label>
            <input 
                value={nombre}
                onChange={(e)=>{
                    setNombre(e.target.value)
                }}
                id="nombre"
                type="text" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                placeholder=""
            />
            <p className={`text-rose-500 font-bold text-sm ${nombreError ? "block" : "hidden" }`}>El nombre es obligatorio*</p>
        </div>
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"  
                htmlFor="descripcion"
            >Descripcion:</label>
            <textarea 
                value={descripcion}
                onChange={(e)=>setDescripcion(e.target.value)}
                id="descripcion"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                placeholder=""
            />
            <p className={`text-rose-500 font-bold text-sm ${descripcionError ? "block" : "hidden" }`}>Ingrese una descripcion*</p>
        </div>
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"  
                htmlFor="fecha-entrega"
            >fecha de entrega:</label>
            <input 
                value={fechaEntrega}
                onChange={(e)=>setFechaEntrega(e.target.value)}
                id="fecha-entrega"
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                
            />
            <p className={`text-rose-500 font-bold text-sm ${fechaEntregaError ? "block" : "hidden" }`}>Selecciona una fecha valida*</p>
        </div>
        <div className="mb-5">
            <label 
                className="text-gray-700 uppercase font-bold text-sm"  
                htmlFor="cliente"
            >nombre del cliente:</label>
            <input 
                value={cliente}
                onChange={(e)=>setCliente(e.target.value)}
                id="cliente"
                type="text" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            />
            <p className={`text-rose-500 font-bold text-sm ${clienteError ? "block" : "hidden" }`}>Ingrese el nombre del cliente*</p>
        </div>
        <input 
            type="submit"
            value={params.id ? "Guardar Cambios" : "Crear Proyecto"}
            className="bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white text-center p-2 font-bold w-full block"
        />
    </form>
  )
}

export default FormularioProyecto