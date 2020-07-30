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
    const [stats, setstats] = useState([]);
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
    const cargarStats = () => {
        getObjeto('Receta')
            .then(data => {

                if (data === undefined) {

                    setError('Problemas, intente mas tarde')
                } else {
                    if ('error' in data) {
                        setError(errorTranslator(data.error.message))
                    } else {
                        data=data.value;
                        
                        var lista=[];

                        for(var i=0; i<data.length; i++){
                                
                           
                           lista.push({_id: data[i]._id,sNombre:data[i].sNombre,vistas:0 });    
                        }
                      
                        setstats(lista);
                        

                        
                       /*for llenand 
                       _id: "5ee019f5c829081ed071373b", sNombre:*/


                    }
                }
            })
}

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    useEffect( ()=>{
        cargarHistorialDisponibles()
        cargarStats()
    }, []);
    
    
    const vistas = (_id) => {
        var vistas=0;
        console.log(HistorialDisponibles)
        for (let index = 0; index < HistorialDisponibles.length; index++) {
             
             if (HistorialDisponibles[index].sReceta===_id) {
                 vistas++;
             }
            
        }
        return(
        <er>
        {vistas}
        </er>
        
        );
        }
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
            { stats.map((video, key) =><div key=  {key}>
                      {/* {key}       {''+item.add} */}
                      
                      {video.sNombre}  vistas:{vistas(video._id)}

                  </div>)}

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