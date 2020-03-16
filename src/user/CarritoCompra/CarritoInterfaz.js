import React, {useState, useEffect} from 'react';
import Layout from '../../nucleo/Layout';
import { Link } from 'react-router-dom';
import {getProductosLocalStorage, actualizarCantidad} from './carritoHelper';
import '../../index.css';
import './carrito.css';


const CarritoInterfaz = ({product}) => {

    
    // contador para definir la cantidad 
    const [count, setCount] = useState(product.count);

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

    return( 
            <div className="row">
                <div className="col-5 mb-3">
                    <img height="300px" width="450px" src={product.sUrlImagen} />
                    <h1 className="d-lg-inline-flex ml-5 text-capitalize mt-5">{product.sNombre}</h1>
                </div>
                <hr />
                <div className="col-1 text-center d-flex justify-content-center align-items-center"><h3>{mostrarOpcionActualizar()}</h3></div>
                <div className="col-3 text-center d-flex justify-content-center align-items-center"><h3>₡{product.iPrecio}</h3></div>
                <div className="col-3 text-center d-flex justify-content-center align-items-center" ><h3>₡Precio final</h3></div>
            </div>

    );
}

export default CarritoInterfaz;