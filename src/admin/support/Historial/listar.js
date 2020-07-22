import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import { isAutentificacion } from '../../../autentificacion/index';
import { Link } from 'react-router-dom';
import {getObjeto,errorTranslator} from '../../apiAdmin';
import HistorialInterfaz from './ObjetoInterfaz';
import '../../../index.css';
import '../support.css';



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
                            data=data.value;
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
        image="https://sc01.alicdn.com/kf/HTB1bPABKVXXXXagXFXXq6xXFXXXm.jpg"
        descripcion="Chef Selenia Mendez" 
        className="container-fluid">
        
            {/* funciones de admin */}
            <div className="row">
                <div className="col-12">                   
                {mostrarError()}
                    {mostrarCrud()}
                </div>
            </div>
            
            {/* contenido principal */}
        <br></br>
        <div className="row ">
        <div  className="col-5 mx-auto">
        
            <div className="table table-borderless">     
                                       
                {HistorialDisponibles.map((Historial, i)=>(
                    <HistorialInterfaz key={i} Historial={Historial}/>
                ))}                   

            </div>
            </div>        
            
        </div>
            
        </Layout>
    );
}

export default Historial;