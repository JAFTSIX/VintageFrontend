import React, {useState, Fragment} from 'react';
import Layout from '../../../nucleo/Layout';
 
import {Link} from 'react-router-dom';
import {insertObject} from '../../apiAdmin';
import '../../../index.css'

const AgregarHistorial = () => {
    const [valor, setValor] = useState({ 
        nombre:"",
        nuevaHistorial:"",
        error: false,
        funciona: false
    });

 

    const {nombre, error, funciona,nuevaHistorial} = valor;

     const handleChange = campo  => event => {
        event.preventDefault();
      
        setValor({...valor,error: false, [campo]: event.target.value});

         console.log(nombre);
     }


     const clickSubmit = (e) => {
         e.preventDefault(); 
         setValor({...valor,error: '', funciona: false});

         console.log(nombre);
         //hacer request al api para crear Historial
         insertObject('Historials',{sNombre:nombre}).then(
        data=>{
            if ('error' in data) {
                setValor({...valor, error:data.error.message, funciona: false});
                
            } else {

                console.log(data)
                setValor({
                    ...valor,
                    sNombre: '',
                    nuevaHistorial: data.sNombre, 
                    error: false,                
                    funciona: true
                });
            }

            }

         )
                       
         //setValor({nombre: newNombre});
         console.log(nombre);
        
     }

 


    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
           
        </div>
        
    );
        
    

    const mostrarFunciona =  () => (
        <div className="alert alert-success" 
        style={{display: funciona ? '' : 'none'}}>
        Historial {nuevaHistorial} creada exitosamente.
        </div>
    );

    const nuevaHistorialForm = () => (
        <form >

            <div className="container">
                <div className="form-group">
                    <label className="text-muetd">Nombre</label>
                    <input type="text" className="form-control"
                    onChange={handleChange('nombre')}
                    autoFocus required/>
                 
                 

                </div>

                <button className="btn btn-outline-primary widthCompleto" onClick={clickSubmit}>
                        Crear Historial
                </button>
            </div>
            
        </form>
    );

    return (
        <Layout titulo="Historial de Recetas" 
        descripcion="Agregar una nueva Historial para las recetas">
        
            <div className="row">
                {/* los links de los usuarios */}
                
                <div className="col-md-8 offset-md-2">
                
                {mostrarError()}    
                {mostrarFunciona()}
                {nuevaHistorialForm()}
                </div>
            </div>

            
        </Layout>
    );

}

export default AgregarHistorial;