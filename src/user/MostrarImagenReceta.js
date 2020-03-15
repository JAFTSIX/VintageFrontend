import React from 'react';
import {API} from '../config';
import '../index.css'

//item = producto
//url para hacer request al api
const MostrarImagenReceta = ({item, url}) => {
    
    return(

    <div className="productoImagen">
        {/* {`${API}/${url}/sUrlImagen/${item._id}`} */}

        <img className="imgProd mb-3" src={`${item.sUrlImagen}`}
         alt={item.sNombre}
        //  style={{maxHeight: '100%', maxWidth: '100%'}}
        //  className="mb-3" 
        />
    </div>
    );
}
    


export default MostrarImagenReceta;