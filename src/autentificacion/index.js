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


//modificar perfil
export const readPerfil = (perfilId, token) => {
    return fetch(`${API}/Cliente/${perfilId}`, {
            method: "GET",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
                
        .then(response => {
            return response.json()
        })
        .catch(err => {
            
            console.log(err);
        })
}

export const modificarPerfil = (perfilId,token,cliente) => {

    return fetch(`${API}/Cliente/${perfilId}`, {
        method: "PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cliente) //convierte el objeto en json string
        
    })
            
    .then(response => {
        return response.json()
    })
    .catch(err => {
        
        console.log(cliente)
    })
}

export const modificarPerfilLocal = (cliente, next) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.cliente = cliente;
            localStorage.setItem('jwt', JSON.stringify(auth));
            console.log(cliente);
            next();
            
        }
    }
}


