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
    return fetch(`${API}/Receta/${recetaId}?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22_id%22%3A%20true%2C%0A%20%20%20%20%22sNombre%22%3A%20true%2C%0A%20%20%20%20%22aEtiqueta%22%3A%20true%2C%0A%20%20%20%20%22dFechaPublicacion%22%3A%20true%2C%0A%20%20%20%20%22sTexto%22%3A%20true%2C%0A%20%20%20%20%22iPrecio%22%3A%20true%2C%0A%20%20%20%20%22sUrlVideo%22%3A%20true%2C%0A%20%20%20%20%22sUrlImagen%22%3A%20true%2C%0A%20%20%20%20%22bActivo%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22string%22%0A%20%20%5D%0A%7D`, {
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
export const  getObjeto= (objeto) => {

    return fetch(`${API}/${objeto}/`, {
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
        default:
            return untranslated;
    }

}