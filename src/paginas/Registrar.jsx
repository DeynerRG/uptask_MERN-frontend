
import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

function Registrar() {

  const [ nombre, setNombre ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ contraseña1, setContraseña1 ] = useState("");
  const [ contraseña2, setContraseña2 ] = useState("");
  const [ alerta, setAlerta ] = useState({});

  const { msg } = alerta;


  async function handleRegistrarUsuario(e){
    e.preventDefault();

    // Validacion de los campos
    // validar que los campos no esten vacios
    const campos = [nombre, email, contraseña1, contraseña2];
    if(campos.includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      setTimeout(()=>{
        setAlerta({})
      }, 3000);
      return;
    }
    // validar que las contraseñas coincidan
    if(contraseña1 !== contraseña2){
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      setTimeout(()=>{
        setAlerta({})
      }, 3000);
      return;
    }
    // validar longitud del password
    if(contraseña1.length < 6){
      setAlerta({
        msg: 'La contraseña es corta, debe tener al menos 6 caracteres',
        error: true
      })
      setTimeout(()=>{
        setAlerta({})
      }, 3000);
      return;
    }

    // Registro del usuario
    try {
      const usuario = {
        nombre, 
        email, 
        password: contraseña1
      }
      // En un template string se le inyecta la variable de entorno de la url del backend
      const respuesta = await clienteAxios.post(`/usuarios`, usuario);
      const { data } = respuesta;
      setAlerta({
        msg: data.msg,
        error: false
      })
      setTimeout(()=>{
        setAlerta({})

        // Limpiar los campos
        setNombre("");
        setEmail("");
        setContraseña1("");
        setContraseña2("");
      }, 8000);

    
    } catch (error) {
      const {data} = error.response;
      setAlerta({
        msg: data.msg,
        error: true
      })
      setTimeout(()=>{
        setAlerta({})
      }, 3000);

    }
    
    
    

  }



  return (
   <>
    
      <Link to={'/'}>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold my-3 text-right text-indigo-500"><span className="text-gray-800">Up</span>Task</h1>
      </Link>
      <h2 className="text-3xl font-bold text-gray-800">Crea una cuenta</h2>
      <p className="text-gray-400">Crea una cuenta para ver y administrar tus proyectos.</p>
      <form action="#" className="" onSubmit={handleRegistrarUsuario}>
        <div className="my-5 w-full">
          <label 
            className="block my-2 font-semibold text-gray-400" 
            htmlFor="nombre"
          >Nombre</label>
          <input 
            value={nombre} 
            onChange={(e)=> setNombre(e.target.value)} 
            className="border-solid border-2 border-indigo-100 w-full p-2" 
            placeholder="Deyner" 
            type="text" 
            name="nombre" 
            id="nombre" 
          />
        </div>
        <div className="my-5 w-full">
          <label 
            className="block my-2 font-semibold text-gray-400" 
            htmlFor="email"
          >Email</label>
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
        <div className="my-5 w-full">
          <label 
            className="block my-2 font-semibold text-gray-400" 
            htmlFor="password"
          >Contraseña</label>
          <input 
            value={contraseña1} 
            onChange={(e)=> setContraseña1(e.target.value)} 
            className="border-solid border-2 border-indigo-100 w-full p-2"  
            type="password" 
            name="password" 
            id="password" 
          />
        </div>
        <div className="my-5 w-full">
          <label 
            className="block my-2 font-semibold text-gray-400" 
            htmlFor="password2"
          >Confirmar Contraseña</label>
          <input 
            value={contraseña2} 
            onChange={(e)=> setContraseña2(e.target.value)} 
            className="border-solid border-2 border-indigo-100 w-full p-2"  
            type="password" 
            name="password2" 
            id="password2" 
          />
        </div>
        <nav>
          <Link 
            to={'/olvide-password'} 
            className="mb-3 font-semibold text-gray-400 block hover:text-indigo-400 text-right"
            >¿Olvidaste tu contraseña?
          </Link>
        </nav>
        <input  
          className="transition-colors bg-indigo-500 hover:bg-indigo-700 cursor-pointer text-white py-3 px-2  w-full text-xl font-semibold" 
          type="submit" 
          value={'Crear cuenta'}
        />
      </form>
      <nav>
        <Link 
          to={'/'} 
          className="mt-5 text-gray-400 block capitalize"
          >¿Ya tienes una cuenta? <span className="text-indigo-400 font-bold">Iniciar sesión</span>
        </Link>
      </nav>
      {
        msg && <Alerta alerta={alerta}/>
      }
      
  
   
   </>
  )
}

export default Registrar