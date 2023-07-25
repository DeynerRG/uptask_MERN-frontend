import FormularioColaborador from "../components/FormularioColaborador"
import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner";


function NuevoColaborador() {
    
    const params = useParams();
    const { id:proyectoID } = params
    const { obtenerProyecto, proyecto, colaborador, cargando, setColaborador, agregarColaborador } = useProyectos();
    
    useEffect(()=>{
        setColaborador({}) 
        obtenerProyecto(proyectoID)
    }, []);
   

  return (
    <>
        <h1 className=" text-2xl md:text-4xl font-bold text-gray-800">Añadir colaborador(a) al proyecto <span className="text-indigo-500">{proyecto.nombre}</span></h1>        
        <div className="flex mt-10 justify-center">
            <FormularioColaborador/>    
        </div>
        {
          cargando ? <Spinner/> : colaborador?._id && (
            <div className="flex justify-center mt-10">
              <div className="bg-white w-full py-10 px-5 md:w-1/2 lg:w-1/3 rounded-md shadow">
                <h2 className="text-center mb-10 text-2xl font-bold">Resultado</h2>
                <div className="flex justify-between items-center">
                  <p>{colaborador.nombre}</p>
                  <button
                    onClick={()=> agregarColaborador({
                      email: colaborador.email
                    })}
                    type="button"
                    className="bg-teal-200 hover:bg-teal-500 hover:text-white p-2 text-teal-500 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>

                  </button>
                </div>
              </div>
            </div>
          )
        }
    </>
  )
}

export default NuevoColaborador