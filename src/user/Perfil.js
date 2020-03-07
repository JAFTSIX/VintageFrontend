import React from 'react';
import Layout from '../nucleo/Layout';
import {isAutentificacion} from '../autentificacion';
import {Link} from 'react-router-dom';
import '../index.css'


const Perfil = () => {

    const {_id, sNombre, sApellido,sCorreo, dNacimiento} = isAutentificacion();

    
    const linkUsuario = () => {
        return(
            <div className="">               
                <ul className="list-group">                   
                    <li className="list-group-item">
                        <Link className="nav-link" to="/perfil/modificar">
                            Modificar Perfil
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/perfil/eliminar">
                            Eliminar Perfil
                        </Link>
                    </li>
                    
                </ul>
            </div>
        );
    };

    const datosPersonales = () => {
        {/* info del cliente */}
        return(
            <div className="card mb-5">
                <h3 className="card-header">
                    Datos personales
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">Nombre: {sNombre}</li>
                    <li className="list-group-item">Apellidos: {sApellido}</li>
                    <li className="list-group-item">Email: {sCorreo}</li>
                    <li className="list-group-item">Fecha de Nacimiento: {dNacimiento}</li>
                </ul>
            </div>
        );
    }

    const historialCompra = () => {
        return(
           
            <div className="card mb-5">
                <h3 className="card-header">
                    Historial de compra
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">Historial</li>
                    
                </ul>
            </div>
        );
    }

    

    return (
        <Layout titulo="Perfil" 
        descripcion={`${sNombre} ${sApellido}`} 
        className="container-fluid">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
                {/* los links de los usuarios */}
                
                <div className="col-9">
                    {datosPersonales()}
                    {historialCompra()}
                </div>

                <div className="col-3">
                    {linkUsuario()}
                </div>
            </div>

            
        </Layout>
    );

}

export default Perfil;