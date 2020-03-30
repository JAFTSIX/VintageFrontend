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
        image="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-0/p640x640/67296179_3012585752101718_1249727829780725760_o.jpg?_nc_cat=104&_nc_sid=110474&_nc_ohc=3EWxP05wr1wAX9Ad7M9&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=6&oh=a0f2746059951017d12d13b5a9990112&oe=5EA50410"
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