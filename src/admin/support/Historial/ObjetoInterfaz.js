import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';





const HistorialInterfaz = ({Historial}) => {

           //to={`/Historial/Support/Eliminar/${Historial._id}`}

    return(
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-body">
             

                    {/* titulo  */}
                    <h1 className="">{Historial.sNombre}</h1> 
        
                    {isAutentificacion() && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                        {/* // aqui se pasa el id del Historial en el url para actualizar */}
                        <Link to={`/Historial/Support/actualizar/${Historial._id}`}>
                            <button className="btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2">
                                Modificar Historial
                            </button>
                        </Link>

                     
                    

                      
                      <Link to={`/Historial/Support/Eliminar/${Historial._id}`} >
                            <button  className="btn btn-outline-primary 
                            
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Historial
                            </button>
                            </Link>
                        
                        </Fragment>
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default HistorialInterfaz;