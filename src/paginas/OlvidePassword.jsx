import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

function OlvidePassword() {

  const [ email, setEmail ] = useState("");
  const [ alerta, setAlerta ] = useState({});

  async function handleSubmit(e){
    e.preventDefault();

    // Validacion del campo del email
    if(email === ""){
      setAlerta({
        msg: "Por favor, ingresa un email",
        error: true
      })
      setTimeout(()=>{
        setAlerta({})
      }, 3000)
    }

    // Envio del email al Back-end
    try {
      
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email });
      console.log(data);
      setAlerta({
        msg: data.msg,
        error: false
      })
      setTimeout(() => {
        setAlerta({});
      }, 5000);


    } catch (error) {
      console.log(error.response);
      
      // Si el usuario ya existe, notificar mediante la alerta.
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    
    }



  }
  const { msg } = alerta;

  return (
    <>
      <Link to={'/'}>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold my-3 text-right text-indigo-500"><span className="text-gray-800">Up</span>Task</h1>
      </Link>
      <h2 className="text-3xl font-bold text-gray-800">¿Olvidaste tu contraseña?</h2>
      <p className="text-gray-400">Ingresa tu email y recibiras un link para recuperar el acceso a tu cuenta.</p>
      <form onSubmit={handleSubmit} action="#">
        <div className="my-5 w-full">
          <label className="block my-2 font-semibold text-gray-400" htmlFor="email">Email</label>
          <input 
            value={email} 
            onChange={(e)=> setEmail(e.target.value)}
            className="border-solid border-2 border-indigo-100 w-full p-2" 
            placeholder="correo@correo.com" 
            type="email" 
            name="email" 
            id="email" 
          />
        </div>
        
        <input className="transition-colors bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-white py-3 px-2  w-full text-xl font-semibold" type="submit" value={'Continuar'}/>
        {
          msg && <Alerta alerta={alerta}/>
        }
      </form>
      <nav>
        <Link to={'/'} className="mt-5 text-gray-400 block capitalize">Ya tienes una cuenta <span className="text-indigo-400 font-bold">Iniciar sesión</span></Link>
      </nav>
      <nav>
          <Link to={'/registrar'} className="my-5 text-gray-400 block capitalize">¿Nuevo usuario? <span className="text-indigo-400 font-bold">Registrate</span></Link>
      </nav>
    </>
  )
}

export default OlvidePassword