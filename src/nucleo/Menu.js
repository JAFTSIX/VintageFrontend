import React, {Fragment} from 'react'; //fragment sirve como un div pero de react
import {Link, withRouter} from 'react-router-dom';
// link --> es igual <a>link</a>, pero no recarga la pagina
// withRouter --> acceder al prop history, ej: cada que acceda a otro menu el /home se cambia
import {cerrarSesion, isAutentificacion} from '../autentificacion';
import SignIn from '../user/SignIn';




//history --> /home 
//ruta --> /home
//si los dos coinciden, se le hace hover
const esHover = (history, ruta) => {
    if(history.location.pathname === ruta){
        return {color: 'rgb(0, 0, 0)'};
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
    <div>
        <ul className="nav nav-tabs navbar-custom justify-content-end">
            <li className="nav-item ">
                <Link className="nav-link" style={esHover(history, "/")} to="/">
                    INICIO
                </Link>
            </li>
           
           {/* si es usuario admin, se va a ver perfil admin,
           si es usuario cliente se ve perfil cliente */}
           {/* esto no esta funcionando todavia  */}
            {isAutentificacion() && sPermisos==='1' &&(
                <Fragment>
                    <li className="nav-item">
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
                                to="/producto/agregar/categoria">
                                    PRODUCTO
                            </Link>
                        
                        </div>
                    </li>

                    
                    
                </Fragment>
            )}
            {isAutentificacion() && sPermisos==='0' &&(
                <li className="nav-item">
                    <Link className="nav-link" style={esHover(history, "/Perfil")} to="/Perfil">
                        PERFIL
                    </Link>
                </li>
            )}

                    <li className="nav-item">
                        <Link className="nav-link" style={esHover(history, "/producto")} to="/producto">
                            PRODUCTO
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={esHover(history, "/receta")} to="/receta">
                            RECETA
                        </Link>
                    </li>

            {/*Ocultar esos menus cuando el usuario ya inicio session*/}
            {/* si no existe ningun usuario en el local storage, va a aparecer esos menus */}
            {!isAutentificacion() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={esHover(history, "/SignIn")} to="/SignIn">
                            INICIAR SESSION
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={esHover(history, "/SignUp")} to="/SignUp">
                            CREAR CUENTA
                        </Link>
                    </li>
                </Fragment>
            )}

            {/* solo va a mostrar el cerrar sesion cuando el usuario esta loguado */}
            {isAutentificacion() && (
                <li className="nav-item">
                <span className="nav-link" 
                    style={{cursor: 'pointer', color: '#ffffff'}} 
                    onClick={()=> cerrarSesion(()=>{
                        history.push('/');
                    })}>
                        SALIR
                </span>
            </li>
            )}
        </ul>
    </div>
    );
}

//withRouter va a pasar el update de la localizacion, history y props de donde se que se renderiza
export default withRouter(Menu);
