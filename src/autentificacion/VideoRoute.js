//la vista privada, para verla, primero necesita loguearse
import React, { Component,useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom'; //documentacion en google react router dom
import {isAutentificacion} from './index'; //por ahora todavia no se ha hecho
import '../index.css'
import {errorTranslator,getObjeto} from './../admin/apiAdmin'; 

//parametro: component de react y el resto del route
const VideoRoute = ({component: Component, ...rest}) => {
    
    const cargarDetalleReceta = recetaId => {
        // funcion ubicado en apiReceta 
        /*leerRecetaDetalle(recetaId).then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setReceta(data);
            }
        })*/
    }


    useEffect(()=>{
        console.log(rest.computedMatch.params.recetaId)
        
    }, []);
    return(
        //si es es autentico, retorna el componente con props, 
        //en caso contrario redirecciona a log in
        <Route  {...rest} render={
            
            props => isAutentificacion() ? (
            //si sí se loguea:
            <Component {...props}/>
        ) : (

            //si no se loguea se redirecciona
            <Redirect to={{pathname: '/signIn', state:{from: props.location}}}/>
        )
    
    }/>

    );
}


export default VideoRoute;