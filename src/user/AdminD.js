import React from 'react';
import Layout from '../nucleo/Layout';
import {isAutentificacion} from '../autentificacion';
import {Link} from 'react-router-dom';
import '../index.css';
import '../css.css';


const AdminD = () => {

    const {_id, sNombre, sApellido,sCorreo, dNacimiento} = isAutentificacion().cliente;
    const fechaNacimiento = (new Date(dNacimiento).getDate() + "/" + (new Date(dNacimiento).getMonth() + 1) + "/" + new Date(dNacimiento).getFullYear()); 
    
    const linkAdmin = () => {
        return(
            <div className="">               
                <ul className="list-group list-group-flush">   

                <a  className="navbar navbar-light" style={{backgroundColor: "#ffc7e4"}}>
                    Acciones
                 </a>
                
                    <li className="list-group-item">
                    
                    
                        <Link className="nav-link"  to="/perfil/modificar">
                            Modificar Perfil
                        </Link>
                        <div className="border-top">          </div> 

                    </li>
                    <li className="list-group-item">
                    
                        <Link className="nav-link" to="/perfil/eliminar">
                            Eliminar Perfil
                        </Link>
                        <div className="border-top"> </div>              
                    </li>

                    <li className="list-group-item">
                    
                        <Link className="nav-link" to="/receta/agregar/categoria">
                            Crear Categoria de recetas
                        </Link>
                        <div className="border-top"> </div>              
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
                    <li className="list-group-item">Fecha de Nacimiento: { fechaNacimiento}</li>
                </ul>
            </div>
        );
    }



    

    return (
        <Layout jumbotron="jumbotronMovimiento" titulo="Perfil Administrador" 
        image="https://www.phoneservicecenter.es/wp-content/uploads/2019/02/Fondo-pantalla-1-Samsung-Galaxy-S10.png"
        descripcion={`${sNombre} ${sApellido}`} 
        className="container-fluid">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
                {/* los links de los usuarios */}
                
                <div className="col-9">
                    {datosPersonales()}
                </div>

                <div className="col-3">
                    {linkAdmin()}
                </div>
            </div>

            
        </Layout>
    );

}

export default AdminD;