
import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const AuthProvider = ({children})=>{

    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{

        async function autenticarUsuario(){

            // Obtener el token del usuario autenticado almacenado en local storage
            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return
            }

            // config para enviar el token del usuario mediante authorization bearer
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data);
                // navigate('/proyectos');

            } catch (error) {
                
                setAuth({})
            } finally{
                setCargando(false);
            }

           
        }

        autenticarUsuario();
    }, []);


    
    useEffect(()=>{
        if(auth._id) navigate("/proyectos");
    }, [auth]);

    function cerrarSesionAuth(){
        setAuth({})
    }

    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando,
                setCargando,
                navigate,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext;