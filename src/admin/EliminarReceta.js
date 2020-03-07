import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import {eliminarReceta} from './apiAdmin';
import {Redirect} from 'react-router-dom';
import '../index.css'


const EliminarReceta= (props) => {
    const [valor, setValor] = useState({          
        recetaEliminado:"",
        redirect:false,
    });

    const {recetaEliminado, redirect} = valor;

    const eliminar = recetaId => {
        eliminarReceta(recetaId)
        .then(data=>{
            setValor({
                redirect:true
            })
            
        })
    }

    useEffect(()=>{
        const recetaId = props.match.params.recetaId
        console.log(recetaId)
        eliminar(recetaId)
        
    }, []);

    const redireccionarUsuario = () => {
        if(redirect){
            return <Redirect to="/receta"></Redirect>
        }
            
    }

    const mostrarFunciona = () => (
        <div className="alert alert-info" 
        style={{display: redirect ? '':''}}>
            <h4>{`Se ha eliminado exitosamente`}</h4>
        </div>
    );

    return (
        <Layout titulo="ELIMINAR RECETA" 
        descripcion="" 
        className="container-fluid">
            
            <div className="row">
            {mostrarFunciona()}   
                   {redireccionarUsuario()}
                             
            </div>
        </Layout>
    );
}

export default EliminarReceta;
