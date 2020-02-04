import React from 'react';
import {API} from '../config';

//item = producto
//url para hacer request al api
const MostrarImagen = ({item, url}) => (
    <div className="productoImagen">
        {/* para ver cual es el url se va al api  VIDEO 84*/}
        {/* src=`${API}/${url}/foto/${item._id}}` */}
        <img src="https://www.tramontina.com/upload/tramon/imagens/CUT/20530616PD001G.jpg"
         alt={item.sNombre}
         style={{maxHeight: '100%', maxWidth: '100%'}}
         className="mb-3" />
    </div>
);
    


export default MostrarImagen;