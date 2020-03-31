import {API} from '../config';
import { isAutentificacion } from '../autentificacion/index';

export const crearProducto = (token,producto) => {

        return fetch(`${API}/Articulo`, {
            method: "POST",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(producto) //convierte el objeto en json string
            
        })
                
        .then(response => {
            return response.json()
        })
        .catch(err => {
            
            console.log(EvalError)
        })
}


export const modificarProducto = (token,producto) => {

    return fetch(`${API}/Articulo/${producto._id}`, {
        method: "PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(producto) //convierte el objeto en json string
        
    })
            
    .then(response => {
        return response.json()
    })
    .catch(err => {
        
        console.log(EvalError)
    })
}

export const getProducto = (productId) => {
    return fetch(`${API}/Articulo/${productId}?filter[offset]=0&filter[limit]=100&filter[skip]=0`, {
            method: "GET",
        })
                
        .then(response => {
            return response.json()
        })
        .catch(err => {
            
            console.log(err);
        })
}

export const eliminarProducto = (productId) => {
    return fetch(`${API}/Articulo/${productId}`, {
            method: "DELETE",
        })
                
        .then(response => {
            return response.json()
        })
        .catch(err => {
            
            console.log(err);
        })
}



/*---------------------------------RECETA--------------------------------*/
export const crearReceta = (token,receta) => {

    return fetch(`${API}/Receta`, {
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(receta) //convierte el objeto en json string
        
    })
            
    .then(response => {
        return response.json()
    })
    .catch(err => {
        
        console.log(EvalError)
    })

}

export const crearCategoriaReceta = (token,categoria) => {

    return fetch(`${API}/Categoria`, {
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoria) //convierte el objeto en json string
        
    })
            
    .then(response => {
        return response.json()
    })
    .catch(err => {
        
        console.log(EvalError)
    })

}


export const modificarReceta = (token,receta) => {

    return fetch(`${API}/Receta/${receta._id}`, {
        method: "PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(receta) //convierte el objeto en json string
        
    })
            
    .then(response => {
        return response.json()
    })
    .catch(err => {
        
        console.log(EvalError)
    })
}

export const getReceta = (recetaId) => {
    return fetch(`${API}/Receta/${recetaId}`, {
            method: "GET",
        })
                
        .then(response => {
            return response.json()
        })
        .catch(err => {
            
            console.log(err);
        })
}

export const eliminarReceta = (recetaId) => {
    return fetch(`${API}/Receta/${recetaId}`, {
            method: "DELETE",
        })
                
        .then(response => {
            return response.json()
        })
        .catch(err => {
            
            console.log(err);
        })
}



/**
 * Aviso estos metodos de abajo seran implementados para realizar operaciones basicas
 *  insert, delete, update, get
 * @param body se refiere al objeto que va a enviarse en el body
 * @param token
 * @param objeto se refiere al objeto del backend que se va a usar
 */
export const  getObjeto= (objeto,query='') => {

   
    return fetch(`${API}/${objeto}${query}`, {
        method: "GET",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAutentificacion().token}`
        },
        
    })
            
    .then(response => {
        return response.json()
    })
    .catch(err => {
        
        console.log(EvalError)
    })
}

export const eliminarObjeto = (objeto,productId) => {
    return fetch(`${API}/${objeto}/${productId}`, {
            method: "DELETE",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAutentificacion().token}`
            },
        })
                
        .then(response => {
            return response
        })
        .catch(err => {
            
            console.log(err);
        })
}


export const modificarObjeto = (objeto,body) => {

    return fetch(`${API}/${objeto}/${body._id}`, {
        method: "PATCH",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAutentificacion().token}`
        },
        body: JSON.stringify(body) 
        
    })
            
    .then(response => {
     
        return response
    })
    .catch(err => {
        
        console.log(err)
    })
}

export const getObjetonyId = (objeto,productId) => {
    return fetch(`${API}/${objeto}/${productId}`, {
            method: "GET",
            headers:{
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAutentificacion().token}`
            }
        })
                
        .then(response => {
            return response.json()
        })
        .catch(err => {
            
            console.log(err);
        })
}


export const insertObject = ( objeto,body) => {

    return fetch(`${API}/${objeto}`, {
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAutentificacion().token}`
        },

        body: JSON.stringify(body)  
        
    })           
    .then(response => {

        return response.json()
    })
    .catch(err => {
        //'Error verifying token: jwt expired'
        
        console.log(EvalError)
    })

}

export const errorTranslator=(untranslated)=>{
    switch (untranslated) {
        case 'Error verifying token: jwt expired':
        
           return 'su sesión ha expirado, inicie sesión nuevamente'
        
        case    'The request body is invalid. See error object `details` property for more info.':
        
            return 'formulario con datos inválidos'
        case   'No payment method is available.':
            return 'método de pago no disponible'
        

        case   'Processor Declined':
            return 'transacción fallida '
        default:
            return untranslated;
    }

}