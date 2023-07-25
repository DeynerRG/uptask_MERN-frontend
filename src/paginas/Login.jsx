import { useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios'
import { validateEmail } from '../helpers';
import useAuth from '../hooks/useAuth';


function Login() {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState(""); 
  const [ alerta, setAlerta ] = useState({});
  

  const { auth, setAuth, cargando } = useAuth();
  


  async function handleLogin(e){
    e.preventDefault();
    
    // Validar los campos
    if([email, password].includes('')){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    // Validar un email correcto
    const emailValid = validateEmail(email);
    if(!emailValid){
      setAlerta({
        msg: "Por favor, ingrese un email valido",
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    try {

      const {data} = await clienteAxios.post('/usuarios/login',{ email, password})
      setAuth(data)
      // Almacenar el token en local storage del navegador
      localStorage.setItem("token", data.token);
      

    } catch (error) {
      const respuestaPeticion = error.response.data.msg;
      setAlerta({
        msg: respuestaPeticion,
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }




  }



  const { msg } = alerta;
  return (
    <>
      
      <Link to={'/'}>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold my-3 text-right text-indigo-500"><span className="text-gray-800">Up</span>Task</h1>
      </Link>
      <h2 className="text-3xl font-bold text-gray-800">Inicio de Sesión</h2>
      <p className="text-gray-400">¡Bienvenido de nuevo! Por favor inicie sesión en su cuenta.</p>
      <form action="#" className="" onSubmit={handleLogin}>
        <div className="my-5 w-full">
          <label className="block my-2 font-semibold text-gray-400" htmlFor="email">Email</label>
          <input 
            className="border-solid border-2 border-indigo-100 w-full p-2" 
            placeholder="correo@correo.com" 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="my-5 w-full">
          <label className="block my-2 font-semibold text-gray-400" htmlFor="password">Contraseña</label>
          <input 
            className="border-solid border-2 border-indigo-100 w-full p-2"  
            type="password" 
            name="password" 
            id="password"
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <nav>
          <Link to={'/olvide-password'} className="mb-3 font-semibold text-gray-400 block hover:text-indigo-400 text-right">¿Olvidaste tu contraseña?</Link>
        </nav>
        <input className="transition-colors bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-white py-3 px-2  w-full text-xl font-semibold" type="submit" value={'Acceder'}/>
        {
          msg && <Alerta alerta={alerta}/>
        }
      </form>
      <nav>
        <Link to={'/registrar'} className="mt-5 text-gray-400 block capitalize">¿Nuevo usuario? <span className="text-indigo-400 font-bold">Registrate</span></Link>
      </nav>
      
    </>
  )
}

export default Login