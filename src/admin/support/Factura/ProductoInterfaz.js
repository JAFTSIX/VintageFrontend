import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';


const ProductoInterfaz = ({producto}) => {



    const ShowImage = ({item, url}) => {
    
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

    return(
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-body">
                <div className="card-overlay"></div>
                    {/* imagen  */}                   
                    <ShowImage item={producto}
                    url="Articulo"/>

  
                    
                    <div className="btnProductos fadeIn-top"> 
                    {/* titulo  */}
                        <h1 className="text-capitalize font-weight-bold text-center text-light">{producto.sNombre}</h1> 
                        <h3 className="text-light">Precio: ₡{producto.iPrecio}  {producto.iCant===undefined && (
                            
                            <h4 className="font-weight-bold" style={{display : 'inline'}}>   X 1</h4>)
                        }

                        {producto.iCant !==undefined && (
                            
                            <h4 className="font-weight-bold" style={{display : 'inline'}}>   X {producto.iCant}</h4>)
                        }

                            </h3>

                        {/* Botones  */}
                        <Link to="/">
                            <button className="btn btn-primary btnPink 
                            mt-2 mb-2 agregarPadding mr-2">
                                Ver Producto
                            </button>
                        </Link>
                        
                    </div>
                    
 
                    
                </div>
            </div>
        </div>
    );
}

export default ProductoInterfaz;