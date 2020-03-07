//la vista privada, para verla, primero necesita loguearse
import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom'; //documentacion en google react router dom
import {isAutentificacion} from './index'; //por ahora todavia no se ha hecho
import '../index.css'


//parametro: component de react y el resto del route
const PrivateRoute = ({component: Component, ...rest}) => (
    //si es es autentico, retorna el componente con props, 
    //en caso contrario redirecciona a log in
    <Route  {...rest} render={props => isAutentificacion() ? (
        //si sí se loguea:
        <Component {...props}/>
    ) : (
        //si no se loguea se redirecciona
        <Redirect to={{pathname: '/signIn', state:{from: props.location}}}/>
    )}/>
);

export default PrivateRoute;