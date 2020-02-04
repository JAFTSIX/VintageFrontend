import React, { Children } from "react";
import Menu from './Menu';
import '../css.css';

//todo los parametros del Layout son props
/*estos props son la estructura de la pagina 
que siempre van a cambiar
*/
const Layout = ({
    titulo='Titulo', 
    descripcion='', 
    className, 
    children}) => (
        
    <div>
        
        

        <div className="jumbotron">
        <Menu />
            <h2 className="pt-5">{titulo}</h2>
            <p className="lead">{descripcion}</p>
        </div>

        <div className={className}>{children}</div>
    </div>
    

);




export default Layout;