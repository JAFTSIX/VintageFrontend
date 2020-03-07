import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import { isAutentificacion } from '../autentificacion';
import { Link } from 'react-router-dom';
import {getReceta} from './apiReceta';
import RecetaInterfaz from './RecetaInterfaz';
import '../index.css'


const Receta = () => {
    //const [productoVendidos, setProductoVendidos] = useState([]);
    const [receta, setReceta] = useState([]);
    const [error, setError] = useState(false);

    //cargar productos para visualizar
    
    const cargarReceta = () => {
        getReceta('bActivo')
        .then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setReceta(data);
                console.log(data);
            }
        })
    }

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    useEffect(()=>{
        cargarReceta()
    }, []);
    

    const crudReceta = () => {
        return(
            <div className="">               
                <ul className="list-group">                   
                    <li className="list-group-item">
                        <Link className="nav-link btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2
                        " to="/receta/agregar">
                            Agregar Receta
                        </Link>
                    </li>
                
                    
                </ul>
            </div>
        );
    };

    const mostrarCrud = () => {
        if(isAutentificacion() 
        && isAutentificacion().sContrasena==="123" 
        && isAutentificacion().sCorreo==="sele"){
            return(
                <div>
                    {crudReceta()}
                </div>
            );
        }else{
            return("");
        }
    }

    return (
        <Layout titulo="RECETA" 
        descripcion="Chef Selenia" 
        className="container-fluid">
            
            {/* funciones de admin */}
            <div className="row">
                <div className="col-9">                   
                    {mostrarCrud()}
                </div>
            </div>
            
            {/* contenido principal */}
        
            <div className="row">     
                                       
                {receta.map((receta, i)=>(
                    <RecetaInterfaz key={i} receta={receta}/>
                ))}                   

            </div>
                
            

            
        </Layout>
    );
}

export default Receta;