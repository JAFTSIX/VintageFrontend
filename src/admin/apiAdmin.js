import {API} from '../config';


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

