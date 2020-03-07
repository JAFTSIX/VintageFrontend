import {API} from '../config'; //aqui se guarda el puerto del api
//import { response } from 'express';
import '../index.css'

/**Ying 
 * body: JSON.stringify(user) //convierte el objeto en json string
 * @param user es el usuario a insertar
 */
export const signUp = (user) => {
  
    user.dNacimiento=new Date(''.concat(user.dNacimiento.toString(),'T12:00:00'))
    
    return fetch(`${API}/Cliente`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user) //convierte el objeto en json string

        })

        .then(response => {
            
            return response.json()
        })
        .catch(err => {

            console.log(err)
            //return err
       
        })
};


export const signIn = (user) => {
    //body: JSON.stringify(user) //convierte el objeto en json string
    //console.log(nombre, apellido1, email, password);
    //fetch();
    

    return fetch(`${API}/login`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: user.sCorreo, password: user.sContrasena }) //convierte el objeto en json string

        })

        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => {
             
            console.log(EvalError)
        })
}



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
        //en el cb se puede redireccionar, limpiar el state, etc
        cb();
        //se usa cuando ya exista una funcion en el api de esto
        // return fetch(`${API}/signOut`, {
        //     method: "GET",
        // })
        // .then(response=>{
        //     console.log('signOut', response);
        // })
        // .catch(err => console.log(err));
    }
}


 