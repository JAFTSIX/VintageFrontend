    import React, {useState, useEffect} from 'react';
    import Layout from '../../nucleo/Layout';
    import { Link } from 'react-router-dom';
    import {getProductosLocalStorage, actualizarCantidad, eliminarProductoCarrito} from './carritoHelper';
    import '../../index.css';
    import './carrito.css';


const CarritoInterfaz = ({product}) => {

    
    // contador para definir la cantidad 
    const [count, setCount] = useState(product.count<=0?1:product.count);
    const [precioUnidad, setPrecioUnidad] = useState(0);
    const [redirect, setRedirect] = useState(false);


    // funcion para ver el cambio que se realiza en cantidad 
    const handleChange = productoId => event => {
        // va a realizar el cambio unicamente si es mayor a 1, no permite cantidad negativa ni 0
        // si es menor que 1, se le asigna 1, sino, el valor que se ingresa 
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1){
            // funcion de carritoHelper 
            actualizarCantidad(productoId, event.target.value);
        }
        setRedirect(true);
    }

    // actualizar cantidad 
    const mostrarOpcionActualizar = () => {
        return (   
                // input para actualizar la cantidad 
            <div className="input-group mb-3">
                
                <input type="number" 
                        maxlength="1" size="1"
                        min="1"
                        className="form-control inputSize" 
                        value={count} 
                        onChange={handleChange(product._id)} />
                {refreshCantidad()}
                
                
            </div>  
        )
    }

    // eliminar producto 
    const eliminaProductoCarrito = () => {
        
        return (
            <Link to="/cart" refresh="true">

                <button class="customBtnCart"
                    onClick={()=>{
                        eliminarProductoCarrito(product._id);
                        window.location.reload(); 
                        }}>
                    <img src="https://cdn3.iconfinder.com/data/icons/iconano-text-editor/512/005-X-512.png" className="iconoEliminarCarrito"/>
                    {/* Eliminar Producto */}
                </button>
          </Link>
            
 
        )
    }

    //refresh cuando se cambia de cantidad
    const refreshCantidad = () => {
        if(redirect){
            console.log('k');
            window.location.reload();
        }
    }

    // Calcular precio por unidad 
    const totalPrecioUnidad = () => {
        let total = 0;
        total = product.count * product.iPrecio;

        return total;
    }

    return(     
            <div className="row">
                

                <div className="col-lg-5 col-md-3 mb-lg-3">
                    <div className="d-lg-inline-flex ml-lg-5 ml-md-1 mt-lg-5 mt-md-1 ">
                        <h1 className="text-capitalize">{product.sNombre}</h1>
                    </div>
                    <img className="imgCarrito" src={product.sUrlImagen} />

                </div>  
                
                <hr />
                {product.recetaOProducto ===0 &&(
                    // {/* cantidad  */}
                    <div className="col-lg-1 col-md-3 text-center d-flex justify-content-center aslign-items-center"><h3>{mostrarOpcionActualizar()}</h3></div>
                )}
                
                {/* precio unidad  */}
                <div className="col-lg-2 col-md-2 text-center d-flex justify-content-center align-items-center"><h3>${product.iPrecio}</h3></div>
                {/* precio total  */}
                <div className="col-lg-3 col-md-2 text-center d-flex justify-content-center align-items-center" ><h3>${totalPrecioUnidad()}</h3></div>
                {/* icono eliminar producto  */}
                <div className="col-lg-1 col-md-2  text-center d-flex justify-content-center align-items-center">{eliminaProductoCarrito()}</div>
                 
            </div>

    );
}

export default CarritoInterfaz;