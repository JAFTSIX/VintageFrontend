import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import { isAutentificacion } from '../../../autentificacion/index';
import { Link } from 'react-router-dom';
import {getObjeto,errorTranslator} from '../../apiAdmin';
import HistorialInterfaz from './ObjetoInterfaz';
import '../../../index.css'



const Historial = () => {
    
    const [HistorialDisponibles, setHistorialDisponibles] = useState([]);
    const [error, setError] = useState(false);
   

    
    
    const cargarHistorialDisponibles = () => {
            getObjeto('Historial')
                .then(data => {

                    if (data === undefined) {

                        setError('Problemas, intente mas tarde')
                    } else {
                        if ('error' in data) {
                            setError(errorTranslator(data.error.message))
                        } else {
                            setHistorialDisponibles(data);
                        }
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
    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
           
        </div>
        
    );
    return (
        <Layout titulo="Historial" 
        jumbotron="jumboEstatico" 
        image="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/p960x960/67816237_3035758673117759_5101590943354585088_o.jpg?_nc_cat=111&_nc_sid=9e2e56&_nc_ohc=G4PV26zKDcYAX-Otv_W&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=6&oh=82da2879ed4e28ce3f551e3262cbd86f&oe=5EA7151C"
        descripcion="Chef Selenia Mendez" 
        className="container-fluid">
        
            {/* funciones de admin */}
            <div className="row">
                <div className="col-9">                   
                {mostrarError()}
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