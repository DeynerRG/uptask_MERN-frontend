import useProyectos from "../hooks/useProyectos"
import Fondo from "../components/Fondo";
import PreviewProyecto from "../components/PreviewProyecto";
import { useEffect } from "react";




function Proyectos() {

  const { proyectos, obtenerProyectos  } = useProyectos();

  useEffect(()=>{
    obtenerProyectos();
  }, []);

  

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">Proyectos</h1>
      <div className={ proyectos.length ? `max-h-[600px] overflow-y-auto mt-5 md:grid md:grid-cols-2 lg:grid-cols-3 gap-2` : `mt-5` }>
        {
          proyectos.length ? (
            proyectos.map((proyecto)=>{
              return <PreviewProyecto key={proyecto._id} proyecto={proyecto}/>
            })
          ) : <Fondo texto={"No hay proyectos aún"}/>
        }
        
      </div>
    </>
  )
}

export default Proyectos