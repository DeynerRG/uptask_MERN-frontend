import { useContext } from "react";
import ProyectosContext from "../context/ProyectoProvider";

export default function useProyectos(){
    return useContext(ProyectosContext);
}