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
    
 

    const mostrarCrud = () => {
        if(isAutentificacion() 
        && isAutentificacion().cliente.bAdmin){
            return(
                <div>
                
                </div>
            );
        }else{
            return("");
        }
    }

    return (
        <Layout titulo="Historial" 
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
        <div  className="col-9">
        
            <div className="table table-borderless">     
                                       
                {HistorialDisponibles.map((Historial, i)=>(
                    <HistorialInterfaz key={i} Historial={Historial}/>
                ))}                   

            </div>
            </div>        
            

            
        </Layout>
    );
}

export default Historial;