import {API} from '../config';


export const getReceta = (ordenar) => {


        return fetch(`${API}/Receta?sortBy=${ordenar}
        &order=asc`, {
            method: "GET",
        })
                
        .then(response => {
            return response.json()
        })
        .catch(err => {
            
            console.log(err);
        })
}

export const leerProductoDetalle = (recetaId) => {
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