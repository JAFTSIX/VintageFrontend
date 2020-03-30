import React, { Children } from "react";
import Menu from './Menu';
import '../css.css';
import '../index.css';
import Footer from './Footer';

//todo los parametros del Layout son props
/*estos props son la estructura de la pagina 
que siempre van a cambiar
*/
const Layout = ({
    titulo='Titulo', 
    descripcion='', 
    className, 
    children,
    jumbotron,
    image}) => (
        
    <div>    

        <div className={jumbotron} 
        style={{ backgroundImage:`url(${image})`}}>
        <Menu />
            <div className="jumbotronContainer">
                <h1 className="pt-5 text-uppercase">{titulo}</h1>
                <h4 className="lead">{descripcion}</h4>
            </div>
            
        </div>

        <div className={className}>{children}</div>

        <Footer />
    </div>
    

);




export default Layout;