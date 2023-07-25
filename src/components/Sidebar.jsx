import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import mascota from "../assets/img/pet.svg"

function Sidebar() {

    const { auth }= useAuth();
    const { nombre, email } = auth;


  return (
    <aside className="">
       <div className="flex justify-between bg-white py-5 px-3 rounded-lg">
            <div className="my-3">
                <h3 className="font-bold text-xl md:text-2xl lg:text-3xl py-1 text-gray-800">¡Bienvenido(a), {nombre}!</h3>
                <p className="text-lg lg:text-xl text-gray-400">{email}</p>
            </div>
            <div className="w-40 hidden md:block">
                <img src={mascota} alt="pet" />
            </div>

            <div className="mt-5 flex items-center gap-2">
                <Link 
                    className="flex gap-2 text-center bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg font-bold" 
                    to={"/proyectos"}
                >   

                    <span className="hidden md:block">Proyectos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>

                </Link>
                <Link 
                    to={"crear-proyecto"}
                    className="flex gap-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white text-center p-2 font-bold w-full"
                >
                    <span className="hidden md:block">Nuevo Proyecto</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </Link>
            </div>
       </div>
    </aside>
  )
}

export default Sidebar