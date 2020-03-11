import React from 'react';
import {crearProducto} from '../admin/apiAdmin';
import {API} from '../config';
import '../index.css';
import './producto.css';

//item = producto
//url para hacer request al api
const MostrarImagen = ({item, url}) => {
    
    return(

    <div className="productoImagen">
        {/* para ver cual es el url se va al api  VIDEO 84*/}
        {/* {`${API}/${url}/sUrlImagen/${item._id}`} */}

        <img className="imgProd mb-3" src={`${item.sUrlImagen}`}
         alt={item.sNombre}
        //  style={{maxHeight: '100%', maxWidth: '100%', minHeight: '100%', minWidth: '100%'}}
        //  className="mb-3" />
        />
    </div>
    );
}
    


export default MostrarImagen;