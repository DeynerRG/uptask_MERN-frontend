import { createContext, useState, useEffect  } from "react";
import clienteAxios from "../config/clienteAxios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import io from 'socket.io-client'


let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({children})=>{
    
    const [ proyectos, setProyectos ] = useState([]);
    const [ proyecto, setProyecto ] = useState({});
    const [ cargando, setCargando ] = useState(false);
    const [ modalFormularioTarea, setModalFormularioTarea ] = useState(false);
    const [ tarea, setTarea ] = useState({});    
    const [ colaborador, setColaborador ] = useState({});
    const [ alerta, setAlerta ] = useState({});
    
    
    const MySwal = withReactContent(Swal);

    function cerrarSesion(){
        setProyectos([])
        setProyecto({})
        localStorage.removeItem("token")
        
    }

    useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, []);


    function handleModalTarea(){
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({})
    }


    async function handleModalEditarTarea(tarea){
        setTarea(tarea);
        setModalFormularioTarea(true);
    }


    async function eliminarProyecto(id){
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await clienteAxios.delete(`/proyectos/${id}`, config);
           
        } catch (error) {
            
            console.log(error)
        }
    }


    async function editarProyecto(proyecto){

        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);
           
        } catch (error) {
            
            console.log(error)
        }
    }


    async function crearProyecto(proyecto){

        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config);
            setProyectos(data)

        } catch (error) {
            
            console.log(error)
        }
    }


    async function submitProyecto(proyecto){
        
        if(proyecto.id){
            // Edicion
            editarProyecto(proyecto)
        }else{
            // Nuevo Proyecto
            crearProyecto(proyecto);
        }

    }


    async function obtenerProyectos(){
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/proyectos', config)
            setProyectos(data)


        } catch (error) {
            console.log(error)
        }
    }

    
    async function obtenerProyecto(proyectoID){
        setCargando(true)
        try {
            
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${proyectoID}`, config)
            setProyecto(data)
           

        } catch (error) {
            console.log(error)
        }finally{
            setCargando(false)
        }

    }


    async function submitTarea(tarea){

        if(tarea?.id){
            editarTarea(tarea);
        }else{
            crearTarea(tarea);
        }
        
    }


    async function editarTarea(tarea){
        try {
            const token = localStorage.getItem('token');
            if(!token) return 
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === data._id ? data : tareaState )
            setProyecto(proyectoActualizado)

        } catch (error) {
            console.log(error)
        }
    }


    async function crearTarea(tarea){
        try {
            const token = localStorage.getItem('token');
            if(!token) return 
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/tareas', tarea, config)
            // Socket io
            socket.emit('nueva tarea', data)

        } catch (error) {
            console.log(error)
        }
    }



    async function eliminarTarea(tarea){
        try {
            const token = localStorage.getItem('token');
            if(!token) return 
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id )
            setProyecto(proyectoActualizado)
            
            

        } catch (error) {
            console.log(error)
        }
    }


    async function submitColaborador(email){
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if(!token) return 
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/colaboradores`, {email} , config)
            setColaborador(data);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            setColaborador({})
        } finally{
            setCargando(false)
        }
    }
    
    async function agregarColaborador(email){
       
        try {

            const token = localStorage.getItem('token');
            if(!token) return 
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email , config);
            obtenerProyecto();
            setColaborador({})

            MySwal.fire({
                position: 'center',
                icon: 'success',
                title: data.msg,
                showConfirmButton: false,
                timer: 1500
            });
            


        } catch (error) {
            
            MySwal.fire({
                position: 'center',
                icon: 'error',
                title: error.response.data.msg,
                showConfirmButton: false,
                timer: 1500
            })
            
        }

    }

   

    async function handleEliminarColaborador(colaborador){
        
        MySwal.fire({
            title: `¿Estas seguro que deseas eliminar este colaborador?`,
            text: "¡No podrás revertir esto.!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366F1',
            cancelButtonColor: '#F43F5E',
            confirmButtonText: '¡Si, eliminar!',
            cancelButtonText: 'cancelar',
            
          }).then( async (result) => {
            if (result.isConfirmed) {

                try {
                    // Eliminar proyecto
                    const token = localStorage.getItem('token');
                    if(!token) return 
                    const config = {
                        headers:{
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, { id: colaborador._id } , config);
                    setColaborador({});
                    obtenerProyecto(proyecto._id)

                    //  Alerta proyecto eliminado
                    await MySwal.fire(
                        '¡Eliminado!',
                        data.msg,
                        'success',
                        
                    )
                } catch (error) {
                    await MySwal.fire(
                        '¡Error!',
                        error.response.data.msg,
                        'error',
                        
                    )
                }
                
            }
          });

    }


    async function completarTarea(id){
        try {
            
            const token = localStorage.getItem('token');
            if(!token) return 
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/tareas/estado/${id}`,{}, config);
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas  = proyectoActualizado.tareas.map((tareaState)=>
                tareaState._id === data._id ? data : tareaState
            )
            setProyecto(proyectoActualizado);
            
            setTarea({})
        } catch (error) {
            console.log(error)
        }
        
        
    }

    function buscarProyecto(busqueda){
        const copiaProyectos = [...proyectos].filter((proyecto)=> {
            return proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        })
       console.log(copiaProyectos)
        
        if(busqueda === ''){
            obtenerProyectos()
        }{
            setProyectos(copiaProyectos)
        }
    }

    // socket io
    function submitTareasProyecto(tarea){
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea]
        setProyecto(proyectoActualizado);
    }




    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                MySwal,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                obtenerProyectos,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                eliminarTarea,
                submitColaborador,
                alerta,
                setAlerta,
                colaborador, 
                setColaborador,
                agregarColaborador,
                handleEliminarColaborador,
                completarTarea,
                buscarProyecto,
                submitTareasProyecto,
                cerrarSesion
                
    
            }}
        > {children}</ProyectosContext.Provider>
    )

}
export {
    ProyectosProvider
}
export default ProyectosContext;