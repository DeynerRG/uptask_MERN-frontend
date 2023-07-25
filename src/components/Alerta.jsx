

function Alerta({alerta}) {
  
  return (
    <div className={`mt-5 p-2 ${alerta.error ? 'bg-rose-600' : 'bg-indigo-400'} text-center text-white capitalize`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta