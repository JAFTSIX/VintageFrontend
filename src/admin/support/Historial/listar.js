import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import { isAutentificacion } from '../../../autentificacion/index';
import { Link } from 'react-router-dom';
import {getObjeto} from '../../apiAdmin';
import HistorialInterfaz from './ObjetoInterfaz';
import '../../../index.css'



const Historial = () => {
    
    const [HistorialDisponibles, setHistorialDisponibles] = useState([]);
    const [error, setError] = useState(false);
   

    
    
    const cargarHistorialDisponibles = () => {
        getObjeto('Historial')
        .then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setHistorialDisponibles(data);
                //console.log(data);
            }
        })
    }

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    useEffect( ()=>{
        cargarHistorialDisponibles()
    }, []);
    

    const crudHistorial = () => {
        return(
            <div className="">               
                <ul className="list-group">                   
                    <li className="list-group-item">
                        <Link className="nav-link btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2
                        " to="/Historial/Support/agregar">
                            Agregar Historial
                        </Link>
                    </li>
                
                    
                </ul>
            </div>
        );
    };

    const mostrarCrud = () => {
        if(isAutentificacion() 
        && isAutentificacion().cliente.bAdmin){
            return(
                <div>
                    {crudHistorial()}
                </div>
            );
        }else{
            return("");
        }
    }

    return (
        <Layout titulo="HistorialS" 
        descripcion="Chef Selenia Mendez" 
        className="container-fluid">
            
            {/* funciones de admin */}
            <div className="row">
                <div className="col-9">                   
                    {mostrarCrud()}
                </div>
            </div>
            
            {/* contenido principal */}
        <br></br>
            <div className="row">     
                                       
                {HistorialDisponibles.map((Historial, i)=>(
                    <HistorialInterfaz key={i} Historial={Historial}/>
                ))}                   

            </div>
                
            

            
        </Layout>
    );
}

export default Historial;