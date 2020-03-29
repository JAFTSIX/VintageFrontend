import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';
import '../support.css';


const ProductoInterfaz = ({producto}) => {



    const ShowImage = ({item, url}) => {
    
        return(
    
        <div className="productoImagen">
            
    
            <img className="imgFacturaProducto mb-3" src={`${item.sUrlImagen}`}
             alt={item.sNombre}
           
            />
        </div>
        );
    }   

    return(
        <div className="col-6 mb-3">    
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


                        
                    </div>
                    
 
                    
                </div>
            </div>
        </div>
    );
}

export default ProductoInterfaz;