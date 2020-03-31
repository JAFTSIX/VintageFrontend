import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MostrarImagenReceta from './MostrarImagenReceta';
import {isAutentificacion} from '../autentificacion/index';
import '../index.css';
import './producto.css';

const RecetaInterfaz = ({receta}) => {
    

    return(
        
        <div className="col-lg-6 col-md-12 mb-3">
            <div className="card ">
                <div className="card-body ">
                    <div className="card-overlay "></div>
                    {/* imagen  */}     
             
                    <MostrarImagenReceta item={receta}
                    url="Articulo"/>
                    
                    <div className="btnProductos fadeIn-top"> 
                    {/* titulo  */}
                        <h1 className="text-capitalize font-weight-bold text-center text-light">{receta.sNombre}</h1>
                        {/* <p><b>Descripcion:</b>  {receta.sTexto}</p> */}
                    
                    {receta.bActivo === true &&(
                        <Fragment>
                        {/* Botones  */}
                        <Link to={`/Receta/Detalle/${receta._id}`}>
                            <button className="btn customBtn btnPink 
                            mt-2 mb-2 agregarPadding mr-2">
                                <img src="https://img.pngio.com/white-eye-3-icon-free-white-eye-icons-eye-png-white-256_256.png" height="50px" width="50px"/>
                                {/* Ver Receta */}
                            </button>
                        </Link>
                        </Fragment>
                    )}

                    {receta.bActivo === false &&(
                        <Fragment>
                        <p className="text-light">Nueva Receta, Próximamente...</p>
                        </Fragment>
                    )}
                        

                        <br />

                        {isAutentificacion() 
                        && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                        {/* // aqui se pasa el id del producto en el url para actualizar */}
                        <Link to={`/Receta/${receta._id}/?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22_id%22%3A%20true%2C%0A%20%20%20%20%22sNombre%22%3A%20true%2C%0A%20%20%20%20%22aEtiqueta%22%3A%20true%2C%0A%20%20%20%20%22dFechaPublicacion%22%3A%20true%2C%0A%20%20%20%20%22sTexto%22%3A%20true%2C%0A%20%20%20%20%22iPrecio%22%3A%20true%2C%0A%20%20%20%20%22sUrlVideo%22%3A%20true%2C%0A%20%20%20%20%22sUrlImagen%22%3A%20true%2C%0A%20%20%20%20%22bActivo%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22string%22%0A%20%20%5D%0A%7D`}>
                            <button className="btn customBtn btnPinkFuerte btnPink
                            mt-2 mb-2 agregarPadding mr-2 text-light">
                                Modificar Receta
                            </button>
                        </Link>

                        <Link to={`Receta/Eliminar/${receta._id}`}>
                            <button className="btn customBtn btnPinkFuerte text-light btnPink
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Receta
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

export default RecetaInterfaz;