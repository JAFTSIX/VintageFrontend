import React, {useState, useEffect } from 'react';
import Layout from '../../nucleo/Layout';
import { Link } from 'react-router-dom';
import {getProductosLocalStorage, actualizarCantidad} from './carritoHelper';
import '../../index.css';
import './carrito.css';
import CarritoInterfaz from './CarritoInterfaz';


const Carrito = () => {
    const [producto, setProducto] = useState([]);

    useEffect(()=>{

        //llamar a la funcion ubicado en carritoHelper
        setProducto(getProductosLocalStorage());  
    
    }, []);



    // Funcion que muestra todos los productos 
    const mostrarProducto = producto => {
        return(
            <div>   
            <div id="tabla" className="mb-3 row px-5" >

                    <div className="col-5 pl-5">PRODUCTOS</div>
                    <div className="col-1 text-center">CANTIDAD</div>
                    <div className="col-2 text-center pl-5">PRECIO / UNIDAD</div>
                    <div className="col-3 text-center pl-5">PRECIO TOTAL</div> 
            </div>

            {producto.map((product, i)=>(
                    <CarritoInterfaz key={i} product={product}/>
                ))} 

                <div className="text-right">
                    <h1>Total de Productos: {producto.length}</h1>
                    <button className="btn btn-outline-primary
                                agregarPadding mb-5">
                                <h4>Proceder al Pago</h4> 
                    </button>
                </div>

            </div>
        )
    };

    // Funcion que muestra si no hay productos 
    const noProductoMensaje = () => {
        return(
            <div className="text-center mb-5">
                <h2>Carrito de Compra esta vacío</h2>
                <h3><Link to="../producto">Continúa Comprando... </Link></h3>
                <img height="300px" width="300px" src="https://i.pinimg.com/originals/f1/ad/41/f1ad41a237e46b6fc147be8674ad216f.png"/>
            </div>
        );
    };

    

    return (    
         
        <Layout jumbotron="jumbotronMovimiento"
        image="https://www.tastefinewines.co.uk/wp-content/uploads/2018/11/gifts-for-christmas.jpg"
         titulo="CARRITO DE COMPRA" 
        descripcion="Chef Selenia Mendez"   
        className="container-fluid">

            <div className="row mt-5">
                <div className="col-12">
                    
                    {/* if si hay productos en el carrito o no  */}
                    {producto.length > 0 ? mostrarProducto(producto) : noProductoMensaje()}
                </div>
                
            </div>
            
        </Layout>
    );

    
}

export default Carrito;