import {API} from '../config'; //aqui se guarda el puerto del api
//import { response } from 'express';
import '../index.css';
 
 

/**Ying 
 * guardar los datos en el local storage
 * el browser tiene un local storage que guarda datos, 
 * 
 * @param data 
 * @param cb 
 */
export const autentificacion = (data, cb) => {
   
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        //en el cb se puede redireccionar, limpiar el state, etc
        cb();
    }
} 




/** Ying
 * si hay datos en el local storage o no
 */
export const isAutentificacion = () => {
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }else{
        return false;
    }
}

//cb es para actualizar el state o redireccionar 
//en este caso se va a redireccionar
export const cerrarSesion = (cb) => {
    
    if(typeof window !== 'undefined'){  
        localStorage.removeItem('jwt');
        localStorage.removeItem('carrito');
        //en el cb se puede redireccionar, limpiar el state, etc
        cb();
    }
}


export const BorrarCarrito =  () => {
    
    if(typeof window !== 'undefined'){  
      
        localStorage.removeItem('carrito');
        //en el cb se puede redireccionar, limpiar el state, etc
    
    }
}
