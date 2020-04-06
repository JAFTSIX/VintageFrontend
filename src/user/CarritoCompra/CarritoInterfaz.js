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
            <div className="">

                <div className="mx-auto">
                    <h3 className="text-capitalize mt-lg-2">{product.sNombre}</h3>
                    <img className="imgCarrito" src={product.sUrlImagen} />
                    <h3 className="text-capitalize">{product.sNombre}</h3>
                </div>  
                
                <hr />
                {product.recetaOProducto ===0 &&(
                    // {/* cantidad  */}
                    <div className="mx-auto"><h3>{mostrarOpcionActualizar()}</h3></div>
                )}

                {/* precio unidad  */}
                <div className="mx-auto"><h3>${product.iPrecio}</h3></div>
                {/* precio total  */}
                <div className="mx-auto" ><h3>${totalPrecioUnidad()}</h3></div>
                {/* icono eliminar producto  */}
                <div className="mx-auto">{eliminaProductoCarrito()}</div>
                 
            </div>

    );
}

export default CarritoInterfaz;