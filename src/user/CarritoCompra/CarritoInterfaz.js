import React, {useState, useEffect} from 'react';
import Layout from '../../nucleo/Layout';
import { Link } from 'react-router-dom';
import {getProductosLocalStorage, actualizarCantidad, eliminarProductoCarrito} from './carritoHelper';
import '../../index.css';
import './carrito.css';


const CarritoInterfaz = ({product}) => {

    
    // contador para definir la cantidad 
    const [count, setCount] = useState(product.count);
    const [precioUnidad, setPrecioUnidad] = useState(0);


    // funcion para ver el cambio que se realiza en cantidad 
    const handleChange = productoId => event => {
        // va a realizar el cambio unicamente si es mayor a 1, no permite cantidad negativa ni 0
        // si es menor que 1, se le asigna 1, sino, el valor que se ingresa 
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1){
            // funcion de carritoHelper 
            actualizarCantidad(productoId, event.target.value);
        }
    }

    // actualizar cantidad 
    const mostrarOpcionActualizar = () => {
        return (
            // input para actualizar la cantidad 
            <div className="input-group mb-3">
                <input type="number" 
                        maxlength="1" size="1"
                        className="form-control inputSize" 
                        value={count} 
                        onChange={handleChange(product._id)} />
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
                    <img src="https://cdn3.iconfinder.com/data/icons/iconano-text-editor/512/005-X-512.png" height="50px" width="50px"/>
                    {/* Eliminar Producto */}
                </button>
          </Link>
            
 
        )
    }

    const calcularPrecioUnidad = () => {
        let kk = product.iPrecio * count;
        setPrecioUnidad(kk);
        
        
    }


    return( 
            <div className="row">
        

                <div className="col-5 mb-3">
                    <img height="300px" width="450px" src={product.sUrlImagen} />
                    <div className="d-lg-inline-flex ml-5 mt-5 ">
                        <h1 className="text-capitalize">{product.sNombre}</h1>
                    </div>
                    
                </div>
                
                <hr />
                <div className="col-1 text-center d-flex justify-content-center aslign-items-center"><h3>{mostrarOpcionActualizar()}</h3></div>
                <div className="col-2 text-center d-flex justify-content-center align-items-center"><h3>₡{product.iPrecio}</h3></div>
                <div className="col-3 text-center d-flex justify-content-center align-items-center" ><h3>₡{precioUnidad}</h3></div>
                <div className="col-1  text-center d-flex justify-content-center align-items-center">{eliminaProductoCarrito()}</div>
                 
            </div>

    );
}

export default CarritoInterfaz;