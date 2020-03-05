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

