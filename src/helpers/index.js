export function validateEmail(email){
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);

}


export function formatearFecha(fecha){
    const formatoCorrecto = fecha.split('T')[0].split('-')
    const date = new Date(formatoCorrecto);
    const optiones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
       
        
    }
    return date.toLocaleDateString('es-ES', optiones)
}