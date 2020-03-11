import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import {eliminarProducto} from './apiAdmin';
import {Redirect} from 'react-router-dom';
import '../index.css'


const EliminarProducto = (props) => {
    const [valor, setValor] = useState({          
        productoEliminado:"",
        redirect:false,
    });

    const {productoEliminado, redirect} = valor;

    const eliminar = productId => {
        eliminarProducto(productId)
        .then(data=>{
            setValor({
                redirect:true
            })
            
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId
        console.log(productId)
        eliminar(productId)
        
    }, []);

    const redireccionarUsuario = () => {
        if(redirect){
            return <Redirect to="/producto"></Redirect>
        }
            
    }

    const mostrarFunciona = () => (
        <div className="alert alert-info" 
        style={{display: redirect ? '':''}}>
            <h4>{`Se ha creado exitosamente`}</h4>
        </div>
    );

    return (
        <Layout titulo="ELIMINAR PRODUCTO" 
        descripcion="" 
        className="container-fluid">
            
            <div className="row">
            {mostrarFunciona()}   
            {redireccionarUsuario()}
                             
            </div>
        </Layout>
    );
}

export default EliminarProducto;
