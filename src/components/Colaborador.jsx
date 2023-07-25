import React from 'react'
import useProyectos from '../hooks/useProyectos'


function Colaborador({colaborador}) {

    const { nombre, email } = colaborador;
    const { handleEliminarColaborador } = useProyectos();
    
    
  
    return (
    <div className='border-b p-3 flex justify-between items-center bg-white mb-2'>
        <div>
            <p className='text-lg font-bold text-gray-600 capitalize'>{nombre}</p>
            <p className='text-lg text-gray-500'>{email}</p>
        </div>
        <button  
            className='bg-rose-200 hover:bg-rose-500 hover:text-white p-2 text-rose-500 rounded-lg'
            onClick={ async ()=> {
                handleEliminarColaborador(colaborador)
                
            }}
        > 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
        </button>
    </div>
  )
}

export default Colaborador