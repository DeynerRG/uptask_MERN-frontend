import React from 'react'
import imagen from '../assets/img/bg-landing.svg'

function Fondo({texto}) {
  return (
    <div className='mt-5 w-full flex flex-col items-center'>
        <img className='block w-full md:w-1/2 lg:w-1/4' src={imagen} alt="imagen de fondo" />
        <p className='mt-3 text-2xl md:text-3xl lg:text-5xl font-bold text-center text-gray-800'>{texto}</p>
    </div>
  )
}

export default Fondo