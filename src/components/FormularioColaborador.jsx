import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

function FormularioColaborador() {
  
    const [ email, setEmail] = useState('');
    
    
    const { submitColaborador, alerta, setAlerta, setColaborador } = useProyectos();

    function handleSubmit(e){
        e.preventDefault();
        
        setColaborador({})  
        //  Validacion del campo
        if(email === ''){
            setAlerta({
                msg: 'Ingresa un email valido',
                error: true
            })
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return 
        }
        
        submitColaborador(email)

    }

    const { msg } = alerta;
    
    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 w-full md:w-1/2 lg:w-1/3 rounded-sm shadow"
        action="#"
      >
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold text-sm"
            htmlFor="email"
          >
            Email colaborador:
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            type="email"
            id="email"
          />
          <input
            type="submit"
            value={'Buscar colaborador'}
            className="mt-5 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white text-center p-2 font-bold w-full block"
          />
          { 
           msg &&  <Alerta alerta={alerta}/>
          }
          
        </div>

      </form>
    );
}

export default FormularioColaborador