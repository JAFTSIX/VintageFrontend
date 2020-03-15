import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MostrarImagen from './MostrarImagen';
import {isAutentificacion} from '../autentificacion/index';
import '../index.css';
import './producto.css';

const ProductoInterfaz = ({producto}) => {
    return(
        <div className="col-4 mb-3 ">
            <div className="card">
                <div className="card-body">
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
                        <button className="btn btn-warning mt-2 
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

                        <Link to={`Eliminar/Articulo/${producto._id}`}>
                            <button className="btn btn-primary btnPinkFuerte
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Producto
                            </button>
                            {/* <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                    </div>
                                </div>
                            </div> */}
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