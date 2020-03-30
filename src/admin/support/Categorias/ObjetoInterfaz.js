import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';





const CategoriaInterfaz = ({Categoria}) => {

    

    return(
        <div className="col-lg-4 mb-3">
            <div className="card">
                <div className="card-body">
             

                    {/* titulo  */}
                    <h1 className="text-center">{Categoria.sNombre}</h1> 
        
                    {isAutentificacion() && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                        {/* // aqui se pasa el id del Categoria en el url para actualizar */}
                        <Link to={`/categoria/Support/actualizar/${Categoria._id}`}>
                            <button className="btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2">
                                Modificar Categoria
                            </button>
                        </Link>

                     
                    

                      
                      <Link to={`/categoria/Support/Eliminar/${Categoria._id}`} >
                            <button  className="btn btn-outline-primary 
                            
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Categoria
                            </button>
                            </Link>
                        
                        </Fragment>
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default CategoriaInterfaz;