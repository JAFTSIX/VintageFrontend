import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MostrarImagenReceta from './MostrarImagenReceta';
import {isAutentificacion} from '../autentificacion/index';
import '../index.css'

const RecetaInterfaz = ({receta}) => {
    return(
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header tituloCard">
                    {receta.sNombre}
                </div>
                <div className="card-body">
                    <MostrarImagenReceta item={receta}
                    url="Articulo"/>
                    <p><b>Descripcion:</b>  {receta.sTexto}</p>
                    <Link to={`/Receta/Detalle/${receta._id}`}>
                        <button className="btn btn-outline-primary 
                        mt-2 mb-2 agregarPadding mr-2">
                            Ver Receta
                        </button>
                    </Link>

                    {isAutentificacion() 
                        && isAutentificacion().sContrasena==="123" 
                        && isAutentificacion().sCorreo==="sele" &&(
                        <Fragment>
                        {/* // aqui se pasa el id del producto en el url para actualizar */}
                        <Link to={`/Receta/${receta._id}/?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22_id%22%3A%20true%2C%0A%20%20%20%20%22sNombre%22%3A%20true%2C%0A%20%20%20%20%22aEtiqueta%22%3A%20true%2C%0A%20%20%20%20%22dFechaPublicacion%22%3A%20true%2C%0A%20%20%20%20%22sTexto%22%3A%20true%2C%0A%20%20%20%20%22iPrecio%22%3A%20true%2C%0A%20%20%20%20%22sUrlVideo%22%3A%20true%2C%0A%20%20%20%20%22sUrlImagen%22%3A%20true%2C%0A%20%20%20%20%22bActivo%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22string%22%0A%20%20%5D%0A%7D`}>
                            <button className="btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2">
                                Modificar Receta
                            </button>
                        </Link>

                        <Link to={`Eliminar/Receta/${receta._id}`}>
                            <button className="btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Receta
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

export default RecetaInterfaz;