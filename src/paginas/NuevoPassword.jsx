import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Alerta from '../components/Alerta.jsx'
import clienteAxios from "../config/clienteAxios.jsx";

function NuevoPassword() {
  
  // tokenValido verifica que el token del url sea correcto y muestra el formulario.
  const [ tokenValido, setTokenValido ] = useState(false);
  const [ alerta, setAlerta ] = useState({});
  const [ password, setPassword ] = useState("");
  const [ passwordUpdated, setPasswordUpdated ] = useState(false);

  const params = useParams();
  const { token } = params;
  
  
  useEffect(()=>{
    
    const comprobarToken = async function(){

      try {    
      
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true);
      
      } catch (error) {
        
        console.log(error.response)
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      
      }

    }

    comprobarToken();
  }, []);

  const { msg } = alerta;

  async function handleSubmit(e){
    e.preventDefault();
    
    // Validacion del password
    if(!password){
      
      setAlerta({
        msg: "Por favor, llene el campo correspondiente",
        error: true
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    
    }
    
    if(password.length < 8){
      setAlerta({
        msg: "La contraseña debe tener al menos 8 caracteres",
        error: true
      });
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return 
    }

    // Almacenar nuevo password
    try {
      
      const { data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
      
      setAlerta({
        msg: data.msg, 
        error: false
      });
      setTimeout(() => {
        setAlerta({})
        setPasswordUpdated(true);
      }, 3000);

    } catch (error) {
      
      setAlerta({
        msg: error.response.data.msg, 
        error: true
      });
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    
    }


  };


  return (
    <>
    
      <Link to={'/'}>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold my-3 text-right text-indigo-500"><span className="text-gray-800">Up</span>Task</h1>
      </Link>
      <h2 className="text-3xl font-bold text-gray-800">Restablece tu contraseña</h2>
      <p className="text-gray-400">Crea una nueva contraseña para recuperar el acceso a tu cuenta y continuar administrando tus proyectos.</p>
      
      {
        (tokenValido && !passwordUpdated) && 
        <form action="#" className="" onSubmit={handleSubmit}>
          <div className="my-5 w-full">
            <label className="block my-2 font-semibold text-gray-400" htmlFor="password">Nueva Contraseña</label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} className="border-solid border-2 border-indigo-100 w-full p-2"  type="password" name="password" id="password" />
          </div>
          <input className="transition-colors bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-white py-3 px-2  w-full text-xl font-semibold" type="submit" value={'Restablecer Contraseña'}/>
        </form>
      }
      {
        msg && <Alerta alerta={alerta} />
      }
      {
        passwordUpdated && <Link to={"/"} className="block mt-3 text text-center capitalize transition-colors bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-white py-3 px-2  w-full text-xl font-semibold">iniciar sesión</Link>
      }
      
  
   
   </>
  )
}

export default NuevoPassword