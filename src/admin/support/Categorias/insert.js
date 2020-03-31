import React, {useState, Fragment} from 'react';
import Layout from '../../../nucleo/Layout';
 
import {Link} from 'react-router-dom';
import {insertObject,errorTranslator} from '../../apiAdmin';
import '../../../index.css'

const AgregarCategoria = () => {
    const [valor, setValor] = useState({ 
        nombre:"",
        nuevaCategoria:"",
        error: false,
        funciona: false
    });

 

    const {nombre, error, funciona,nuevaCategoria} = valor;

     const handleChange = campo  => event => {
        event.preventDefault();
      
        setValor({...valor,error: false, [campo]: event.target.value});

         console.log(nombre);
     }


     const clickSubmit = (e) => {
         e.preventDefault(); 
         setValor({...valor,error: '', funciona: false});

         console.log(nombre); 
         if (nombre.length>0) {
             //hacer request al api para crear categoria
         insertObject('Categoria',{sNombre:nombre}).then(
            data=>{

                if (data === undefined) {
                    setValor({
                      ...valor,
                      error:'Problemas, intente más tarde'
                    });
                  } else{
                    if ('error' in data) {
                        setValor({...valor, error:errorTranslator(data.error.message), funciona: false});
                        
                    } else {
        
                      
                        setValor({
                            ...valor,
                            sNombre: '',
                            nuevaCategoria: data.sNombre, 
                            error: false,                
                            funciona: true
                        });
                    }

                  }

              

                
                }
    
             )

         } else {
            setValor({...valor,error: 'campo vacío', funciona: false});
         } 
         
                       
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
        Categoria {nuevaCategoria} creada exitosamente.
        </div>
    );

    const nuevaCategoriaForm = () => (
        <form >

            <div className="container">
                <div className="form-group">
                    <label className="text-muetd">Nombre</label>
                    <input type="text" className="form-control"
                    onChange={handleChange('nombre')}
                    autoFocus 
                    required/>
                 
                 

                </div>

                <button className="btn btn-outline-primary widthCompleto" onClick={clickSubmit}>
                        Crear Categoria
                </button>
            </div>
            
        </form>
    );

    return (
        <Layout titulo="Categoria de Recetas"
        jumbotron="jumboEstatico" 
        image="https://i.dietdoctor.com/es/wp-content/uploads/2019/09/lowcarb-que-comer.jpg?auto=compress%2Cformat&w=1200&h=675&fit=crop" 
        descripcion="Agregar una nueva categoria para las recetas">
        
            <div className="row">
                {/* los links de los usuarios */}
                
                <div className="col-md-8 offset-md-2">
                
                {mostrarError()}    
                {mostrarFunciona()}
                {nuevaCategoriaForm()}
                </div>
            </div>

            
        </Layout>
    );

}

export default AgregarCategoria;