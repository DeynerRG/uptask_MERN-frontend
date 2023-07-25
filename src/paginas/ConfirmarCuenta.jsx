import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

function ConfirmarCuenta() {

  const params = useParams(); // Devuelve los parametros de una ruta cuando se utiliza reactRouter
  const { id } = params;
  const [ alerta, setAlerta ] =  useState({});
  const [ cuentaCofirmada, setCuentaConfirmada ] = useState(false);

  useEffect(()=>{
    
    async function confirmarCuenta(){
      try {
        
        const {data} = await clienteAxios.get(`/usuarios/confirmar/${id}`)
       
        setAlerta({
          msg: data.msg,
          error: false,
          
        })
        setCuentaConfirmada(true);

      } catch (error) {
        
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })

      }

      
    }
    
    return ()=>{confirmarCuenta()}
    
   
  },[]);

  const { msg } = alerta;


  return (
    <>
    
      <Link to={'/'}>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold my-3 text-right text-indigo-500"><span className="text-gray-800">Up</span>Task</h1>
      </Link>
      <h2 className="text-3xl font-bold text-gray-800">Confirmación de cuenta</h2>
      <p className="text-gray-400">Este es el ultimo paso para empezar a crear y administrar tus proyectos.</p>

      {
        cuentaCofirmada && (<Link to={'/'} className="block my-3 text-center transition-colors bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-white py-2 px-2  w-full text-xl font-semibold">Iniciar sesión</Link>)
      }
      {
        msg && (<Alerta alerta={alerta}/>)
      }
   </>
  )
}

export default ConfirmarCuenta