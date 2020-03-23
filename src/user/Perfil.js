import React, { Fragment } from 'react';
import Layout from '../nucleo/Layout';
import {isAutentificacion} from '../autentificacion';
import {Link} from 'react-router-dom';
import '../index.css';  
import '../css.css';


const Perfil = () => {

    const {_id, sNombre, sApellido,sCorreo,dNacimiento} = isAutentificacion().cliente;
    const fechaNacimiento = (new Date(dNacimiento).getDate() + "/" + (new Date(dNacimiento).getMonth() + 1) + "/" + new Date(dNacimiento).getFullYear()); 

     

   
    
    const linkUsuario = () => {
        return(
            // <div className="">               
            //     <ul className="list-group">                   
            //         <li className="list-group-item">
            //             <Link className="nav-link" to="/perfil/modificar">
            //                 Modificar Perfil
            //             </Link>
            //         </li>
            //         <li className="list-group-item">
            //             <Link className="nav-link" to="/perfil/eliminar">
            //                 Eliminar Perfil
            //             </Link>
            //         </li>
                    
            //     </ul>
            // </div>

        <div className="row d-flex justify-content-center">
            <div class="col-2">
                <Link className="nav-link" to="/perfil/modificar">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/14/14853.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Modificar Perfil</h3>
                </div>
                </div>
                </Link>
            </div>
            <div class="col-2">
                
                <Link className="nav-link" to="/perfil/eliminar">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/30/30720.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Eliminar Perfil</h3>
                </div>
                </div>
                </Link>
            </div>
            <div class="col-2">              
                <Link className="nav-link" to="/producto">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/1/1375.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Productos</h3>
                </div>
                </div>
                </Link>
            </div>
            <div class="col-2">              
                <Link className="nav-link" to="/receta">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/53/53031.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Recetas</h3>
                </div>
                </div>
                </Link>
            </div>
            <div class="col-2">              
                <Link className="nav-link" to="/cart">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/107/107831.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Carrito de Compras</h3>
                </div>
                </div>
                </Link>
            </div>
        </div>

        );
    };

    const datosPersonales = () => {
        {/* info del cliente */}
        return(
            <div className="card perfilCard mb-5">
                <h3 className="card-header perfilCardHeader">
                    Mi Cuenta
                </h3>
                <ul className="list-group">
                    <li className="list-group-item text-capitalize"><strong>Nombre: </strong>{sNombre}</li>
                    <li className="list-group-item text-capitalize"><strong>Apellido: </strong>{sApellido}</li>
                    <li className="list-group-item"><strong>Email: </strong>{sCorreo}</li>
                    <li className="list-group-item"><strong>Fecha de Nacimiento: </strong>{fechaNacimiento}</li>
                </ul>
            </div>
        );
    }

    const historialCompra = () => {
        return(
           
            <div className="card mb-5">
                <h3 className="card-header">
                    Historial de Compra
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">Historial</li>
                    
                </ul>
            </div>
        );
    }

    

    return (
        <Layout jumbotron="jumbotronMovimiento"
        image="https://wallroom.io/img/2560x1440/bg-e4f1f74.jpg"
        titulo="Perfil" 
        descripcion={`${sNombre} ${sApellido}`} 
        className="container-fluid mt-5">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
                {/* los links de los usuarios */}
               

                <div className="col-3">
                    {datosPersonales()}
                    {/* {historialCompra()} */}
                </div>

                <div className="col-9">
                    {linkUsuario()}
                </div>
            </div>

            
        </Layout>
    );

}

export default Perfil;