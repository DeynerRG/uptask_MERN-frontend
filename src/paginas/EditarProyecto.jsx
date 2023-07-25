import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import FormularioProyecto from '../components/FormularioProyecto';

function EditarProyecto() {
  
  return (
    <>
        {/* {<h1 className='font-bold text-4xl capitalize text-gray-800 text-center'>Editando: {proyecto.nombre}</h1>} */}
        <div className='mt-10 flex justify-center'>
            <FormularioProyecto/>
        </div>
    </>
  )
}

export default EditarProyecto