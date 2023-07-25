import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos";
import { useEffect, useState } from "react";


function Header() {
    const { cerrarSesionAuth, navigate } = useAuth();
    const {buscarProyecto, cerrarSesion } = useProyectos();
    const [ inputValue, setInputValue] = useState('');
    
    function handleCerrarSesion(){
        cerrarSesion();
        cerrarSesionAuth()
        navigate('/')
    }
    useEffect(()=>{
        buscarProyecto(inputValue)
    },[inputValue])

  return (
    <header className="px-4 py-5 bg-white">
        <div className="flex gap-4 flex-col md:flex-row justify-between md:items-center">
            <h2 className="text-4xl lg:text-6xl font-bold my-3 text-right text-indigo-500"><span className="text-gray-800">Up</span>Task</h2>
            <input
                value={inputValue} 
                onInput={(e)=> {setInputValue(e.target.value)}}
                type="search" 
                placeholder="Buscar proyecto"
                className="p-2 rounded-lg w-full md:w-96 lg:w-1/3 block border"
            />
            
            <div className="flex justify-end gap-3 items-center"> 
                
                <button onClick={handleCerrarSesion} className=" flex my-2 text-gray-400 hover:text-indigo-500">
                    <span className="hidden md:block">Salir</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>

                </button>
            </div>
        </div>
    </header>
  )
}

export default Header