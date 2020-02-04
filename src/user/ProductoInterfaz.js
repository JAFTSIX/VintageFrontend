import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MostrarImagen from './MostrarImagen';
import {isAutentificacion} from '../autentificacion/index';

const ProductoInterfaz = ({producto}) => {
    return(
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header tituloCard">
                    {producto.sNombre}
                </div>
                <div className="card-body">
                    <MostrarImagen item={producto}
                    url="Articulo"/>
                    <p><b>Descripcion:</b>  {producto.sDescripcion}</p>
                    <p><b>Precio:</b>  {producto.iPrecio}</p>
                    <Link to="/">
                        <button className="btn btn-outline-primary 
                        mt-2 mb-2 agregarPadding mr-2">
                            Ver Producto
                        </button>
                    </Link>
                    <button className="btn btn-outline-warning mt-2 
                    mb-2 agregarPadding">
                            Añadir a Carrito de Compra
                    </button>

                    {isAutentificacion() 
                        && isAutentificacion().sContrasena==="123" 
                        && isAutentificacion().sCorreo==="sele" &&(
                        <Fragment>
                        {/* // aqui se pasa el id del producto en el url para actualizar */}
                        <Link to={`/Articulo/${producto._id}/?filter[offset]=0&filter[limit]=100&filter[skip]=0`}>
                            <button className="btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2">
                                Modificar Producto
                            </button>
                        </Link>

                        <Link to={`Eliminar/Articulo/${producto._id}`}>
                            <button className="btn btn-outline-primary 
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
    );
}

export default ProductoInterfaz;