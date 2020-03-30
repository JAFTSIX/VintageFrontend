import React, {Fragment} from 'react'; //fragment sirve como un div pero de react
import {Link, withRouter} from 'react-router-dom';
// link --> es igual <a>link</a>, pero no recarga la pagina
// withRouter --> acceder al prop history, ej: cada que acceda a otro menu el /home se cambia
import {cerrarSesion, isAutentificacion} from '../autentificacion';
import signIn from '../user/SignIn';
import './principal.css';
import '../index.css';
import '../css.css';
import  {productoTotal} from '../user/CarritoCompra/carritoHelper';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import logo from '../image/logo.png'




//history --> /home 
//ruta --> /home
//si los dos coinciden, se le hace hover
const esHover = (history, ruta) => {
    if(history.location.pathname === ruta){
        return {color: 'rgb(255, 0, 234)'};
         //si hace hover aparezca este color
    }else {
        return {color: '#ffffff'};  
        // color default = blanco
    }
} 

const esHoverDropDown = (history, ruta) => {
    if(history.location.pathname === ruta){
        return {color: 'rgb(255, 0, 234)'};
         //si hace hover aparezca este color
    }else {
        return {color: 'rgb(255, 0, 234)'};
        // color default = blanco
    }
} 





//{history} --> acceder desde el props con la var history
// para que el sistema sepa que es history
const Menu = ({history}) => {

    // metodos para salir session 
    const redirect =()=>{
        history.push('/');
    }
    const close = () => {
        confirmAlert    ({
            title: '¿Seguro que desea salir de esta cuenta?',
            message: <p>Si cierra sesión se eliminará todos los productos del carrito de compras.</p>,
            buttons: [
              {
                label: 'No'
              },
              {
                label: 'Si',
                onClick: () =>cerrarSesion(redirect)
              }
            ]
          });
    }


    // -----------salir sesion --------------

    const {sPermisos} =isAutentificacion();
    //solo es para definir el rol mientras todavia no existe en la api

    return(
        
    <nav className="navbar-expand-lg navbar-dark bg-dark text-center fixed-top ml-auto p-3">
        
    <div className="row">   
        <div className="col-lg-12">
        <ul className="navbar-custom justify-content-end navbar-nav topnav-right d-flex flex-row">
            <div className="col-lg-2 col-md-3 col-sm-2">
            <li className="nav-item">   
                <img src={logo} className="logo"/>
            </li>
            </div>  
            <div className="col-lg-12 col-md-9 col-sm-10 responsiveMenu">
            <li className="nav-item">
                <Link className="nav-link" style={esHover(history, "/")} to="/">
                    INICIO
                </Link>
            </li>
           {/* si es usuario admin, se va a ver perfil admin,
           si es usuario cliente se ve perfil cliente */}
           {/* esto no esta funcionando todavia  */}
            {isAutentificacion() && isAutentificacion().cliente.bAdmin &&(
                <Fragment>
                    <li className="nav-item mx-2 dropdown">
                        <Link className="nav-link" style={esHover(history, "/Admin")} to="/Admin">
                            PERFIL
                        </Link>
                    </li>

                    <li className="nav-item mx-2 dropdown ">
                        <a className="nav-link dropdown-toggle colorBlanco text-light" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ACCIONES ADMINISTRADOR
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="nav-link" 
                                style={esHoverDropDown(history, "/producto/agregar")}                     
                                to="/producto/agregar">
                                    Añadir Producto
                            </Link>
                            <Link className="nav-link" 
                                style={esHoverDropDown(history, "/producto/agregar")}                     
                                to="/receta/agregar">
                                    Añadir Receta
                            </Link>
                        
                            <Link className="nav-link" 
                                style={esHoverDropDown(history, "/categoria/Support/")}                     
                                to="/categoria/Support/">
                                    Categorias

                            </Link>

                            <Link className="nav-link" 
                                style={esHoverDropDown(history, "/Factura/Support/")}                     
                                to="/Factura/Support/">
                                      Factura

                            </Link>

                            <Link className="nav-link" 
                                style={esHoverDropDown(history, "/Historial/Support/")}                     
                                to="/Historial/Support/">
                                      Historial

                            </Link>
                        </div>
                    </li>
 
                    
                </Fragment>
            )}
            {isAutentificacion()&& !isAutentificacion().cliente.bAdmin &&(
                <li className="nav-item dropdown mx-2">
                    <Link className="nav-link" style={esHover(history, "/Perfil")} to="/Perfil">
                        PERFIL
                    </Link>
                </li>
            )}
                    <li className="nav-item dropdown mx-2">
                        <Link className="nav-link" style={esHover(history, "/receta")} to="/receta">
                            RECETA
                        </Link>
                    </li>
                    <li className="nav-item dropdown mx-2">
                        <Link className="nav-link" style={esHover(history, "/producto")} to="/producto">
                            PRODUCTO
                        </Link>
                    </li>
                    

                    <li className="nav-item dropdown mx-2">
                        <Link className="nav-link" style={esHover(history, "/cart")} to="/cart">
                            CARRITO COMPRAS
                            {/* cantidad de productos en el carrito de compra  */}
                            <sup><small className="carritoTotal">{productoTotal()}</small></sup>
                        </Link>
                    </li>
                    

            {/*Ocultar esos menus cuando el usuario ya inicio session*/}
            {/* si no existe ningun usuario en el local storage, va a aparecer esos menus */}
            {!isAutentificacion() && (
                <Fragment>
                    <li className="nav-item dropdown mx-2">
                        <Link className="nav-link" style={esHover(history, "/SignIn")} to="/SignIn">
                            INICIAR SESSION
                        </Link>
                    </li>
                    <li className="nav-item dropdown mx-2">
                        <Link className="nav-link" style={esHover(history, "/SignUp")} to="/SignUp">
                            CREAR CUENTA
                        </Link>
                    </li>
                </Fragment>
            )}

                    

            {/* solo va a mostrar el cerrar sesion cuando el usuario esta loguado */}
            {isAutentificacion() && (
                <li className="nav-item dropdown mx-2">
                    
                <span className="nav-link" 
                    style = {
                        {
                            cursor: 'pointer',
                            color: '#ffffff'
                        }
                    }
                    onClick = {()=> close()
                        // () => cerrarSesion(() => {
                        //     history.push('/');
                        // })
                        
                    } >
                        SALIR
                </span>
            </li>
            )}
            </div>
        </ul>
        
    </div>
    </div>
    </nav>
    );
}

//withRouter va a pasar el update de la localizacion, history y props de donde se que se renderiza
export default withRouter(Menu);
