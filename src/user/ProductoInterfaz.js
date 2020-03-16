import React, { Fragment,useState }from 'react';
import { Link, Redirect } from 'react-router-dom';
import MostrarImagen from './MostrarImagen';
import {isAutentificacion} from '../autentificacion/index';
import '../index.css';
import './producto.css';
import {agregarProductoCarrito} from './CarritoCompra/carritoHelper'


const ProductoInterfaz = ({producto}) => {

    const [redirect, setRedirect] = useState(false);

    const agregarCarrito = () => {
        // parametros -> el producto que viene del prop y el cb function 
        agregarProductoCarrito(producto, ()=>{
            setRedirect(true);
        })
    }

    const redireccionarUsuario = redirect => {
        if(redirect){
            return <Redirect to="/cart"/>
        }
    }

    return(
        <div className="col-4 mb-3 ">
            <div className="card">
                <div className="card-body">
                    {/* llamar a la funcion para redireccionar al usuario  */}
                    {redireccionarUsuario(redirect)}
                <div className="card-overlay maxheigh"></div>
                    {/* imagen  */}                   
                    <MostrarImagen item={producto}
                    url="Articulo"/>

                    {/* <p><b>Descripcion:</b>  {producto.sDescripcion}</p>
                    <p><b>Precio:</b>  {producto.iPrecio}</p> */}
                    
                    {/* hover  */}
                    <div className="btnProductos fadeIn-top"> 
                    {/* titulo  */}
                        <h1 className="text-capitalize font-weight-bold text-center text-light">{producto.sNombre}</h1> 
                        <h3 className="text-light">Precio: ₡{producto.iPrecio}</h3>

                        {/* Botones  */}
                        <Link to={`/Articulo/Detalle/${producto._id}`}>
                            <button className="btn btn-primary btnPink 
                            mt-2 mb-2 agregarPadding mr-2">
                                Ver Producto
                            </button>
                        </Link>
                        {/* llamar otra funcion para llamar al carritoHelper y no llamar directamente  */}
                        <button onClick={agregarCarrito} className="btn btn-warning mt-2 
                        mb-2 agregarPadding">
                                Añadir a Carrito de Compra
                        </button>

                        <br />

                        {isAutentificacion() 
                        && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                        {/* // aqui se pasa el id del producto en el url para actualizar */}
                        <Link to={`/Articulo/${producto._id}/?filter[offset]=0&filter[limit]=100&filter[skip]=0`}>
                            <button className="btn btn-primary btnPinkFuerte
                            mt-2 mb-2 agregarPadding mr-2">
                                Modificar Producto
                            </button>
                        </Link>

                        <Link to={`Articulo/Eliminar/${producto._id}`}>
                            <button className="btn btn-primary btnPinkFuerte
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Producto
                            </button>
                        </Link>
                        </Fragment>
                    )}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductoInterfaz;