import React, {Fragment} from 'react'; //fragment sirve como un div pero de react
import {Link, withRouter} from 'react-router-dom';
// link --> es igual <a>link</a>, pero no recarga la pagina
// withRouter --> acceder al prop history, ej: cada que acceda a otro menu el /home se cambia
import {cerrarSesion, isAutentificacion} from '../autentificacion';
import signIn from '../user/SignIn';
import './principal.css'
import '../index.css'





//history --> /home 
//ruta --> /home
//si los dos coinciden, se le hace hover
const esHover = (history, ruta) => {
    if(history.location.pathname === ruta){
        return {color: '#ff00ea'};
         //si hace hover aparezca este color
    }else {
        return {color: '#ffffff'};
        // color default = blanco
    }
} 

const esHoverDropDown = (history, ruta) => {
    if(history.location.pathname === ruta){
        return {color: 'rgb(155, 32, 124)'};
         //si hace hover aparezca este color
    }else {
        return {color: '#000000'};
        // color default = blanco
    }
} 

//{history} --> acceder desde el props con la var history
// para que el sistema sepa que es history
const Menu = ({history}) => {

    const {sPermisos} =isAutentificacion();
    //solo es para definir el rol mientras todavia no existe en la api

    return(
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-center fixed-top ml-auto">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
    <div className="collapse navbar-collapse" id="navbarSupportedContent"> 
        <ul className="nav nav-tabs navbar-custom justify-content-end navbar-nav ml-auto topnav-right">
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
                    <li className="nav-item dropdown">
                        <Link className="nav-link" style={esHover(history, "/Admin")} to="/Admin">
                            PERFIL
                        </Link>
                    </li>

                    <li className="nav-item dropdown ">
                        <a className="nav-link dropdown-toggle colorBlanco" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        CATEGORIA
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="nav-link" 
                                style={esHoverDropDown(history, "/producto/agregar/categoria")}                     
                                to="/producto/agregar">
                                    PRODUCTO
                            </Link>
                        
                            <Link className="nav-link" 
                                style={esHoverDropDown(history, "/categoria/Support/agregar")}                     
                                to="/categoria/Support/">
                                    CATEGORIAS

                            </Link>

                            <Link className="nav-link" 
                                style={esHoverDropDown(history, "/categoria/Support/agregar")}                     
                                to="/Factura/Support/">
                                      Factura

                            </Link>
                        </div>
                    </li>

                    
                    
                </Fragment>
            )}
            {isAutentificacion()&& !isAutentificacion().cliente.bAdmin &&(
                <li className="nav-item dropdown ">
                    <Link className="nav-link" style={esHover(history, "/Perfil")} to="/Perfil">
                        PERFIL
                    </Link>
                </li>
            )}

                    <li className="nav-item dropdown">
                        <Link className="nav-link" style={esHover(history, "/producto")} to="/producto">
                            PRODUCTO
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link" style={esHover(history, "/receta")} to="/receta">
                            RECETA
                        </Link>
                    </li>

            {/*Ocultar esos menus cuando el usuario ya inicio session*/}
            {/* si no existe ningun usuario en el local storage, va a aparecer esos menus */}
            {!isAutentificacion() && (
                <Fragment>
                    <li className="nav-item dropdown">
                        <Link className="nav-link" style={esHover(history, "/SignIn")} to="/SignIn">
                            INICIAR SESSION
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link" style={esHover(history, "/SignUp")} to="/SignUp">
                            CREAR CUENTA
                        </Link>
                    </li>
                </Fragment>
            )}

            {/* solo va a mostrar el cerrar sesion cuando el usuario esta loguado */}
            {isAutentificacion() && (
                <li className="nav-item dropdown">
                <span className="nav-link" 
                    style = {
                        {
                            cursor: 'pointer',
                            color: '#ffffff'
                        }
                    }
                    onClick = {
                        () => cerrarSesion(() => {
                            history.push('/');
                        })
                    } >
                        SALIR
                </span>
            </li>
            )}
        </ul>
    </div>
    </nav>
    );
}

//withRouter va a pasar el update de la localizacion, history y props de donde se que se renderiza
export default withRouter(Menu);
