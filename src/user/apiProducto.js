import {API} from '../config';


export const getProductoG = (ordenar) => {


        return fetch(`${API}/Articulo?sortBy=${ordenar}
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