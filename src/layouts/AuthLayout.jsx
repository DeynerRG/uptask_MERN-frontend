import { Outlet } from "react-router-dom"
import bgLogin from '../assets/img/bg-login.svg'
function AuthLayout() {
  return (
    <>
        <main className="flex justify-center items-center min-h-screen ">
            <div className="lg:flex md:w-10/12 2xl:w-8/12">
                <div className="w-full lg:w-6/12 flex items-center">
                    <img
                        className="w-full block" 
                        src={bgLogin} alt="imagen de fondo"
                    />
                </div>
                <div className="w-full lg:w-6/12 p-5">
                    <Outlet/>
                </div>
            </div>
        </main>
        
    </>
  )
}

export default AuthLayout