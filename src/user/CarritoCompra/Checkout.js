import React, {useState, useEffect} from 'react';
import Layout from '../../nucleo/Layout';
import { Link } from 'react-router-dom';
import {getProductosLocalStorage, actualizarCantidad, eliminarProductoCarrito} from './carritoHelper';
import '../../index.css';
import './carrito.css';

const Checkout = ({products}) => {
    {/* calcular el total de carrito de compra  */}
    const getTotal = () => {

        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total = total+products[i].count * products[i].iPrecio;    
            
        }

        return total;
    }

    {/* calcular total de producto  */}
    const getTotalProductos = () => {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total=total+parseInt(products[i].count);
        }
        return total;
    }

    return <div>
                {/* calcular total de producto  */}
                <h1>Total de Productos: {getTotalProductos()}</h1>
                {/* calcular el total de carrito de compra  */}
                <h1>Total: ₡{getTotal()}</h1>
            </div>
}

export default Checkout;