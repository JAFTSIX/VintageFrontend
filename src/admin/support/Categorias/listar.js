import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import { isAutentificacion } from '../../../autentificacion/index';
import { Link } from 'react-router-dom';
import {getObjeto,errorTranslator} from '../../apiAdmin';
import CategoriaInterfaz from './ObjetoInterfaz';
import '../../../index.css'



const Categoria = () => {
    
    const [CategoriaDisponibles, setCategoriaDisponibles] = useState([]);
    const [error, setError] = useState(false);
   

    
    
    const cargarCategoriaDisponibles = () => {
        getObjeto('Categoria')
        .then(data=>{
            
            if(data=== undefined){
                
                setError('Problemas, intente mas tarde')
            }  else{
                if ('error' in data) {
                    setError(errorTranslator(data.error.message))
                }else{
                    setCategoriaDisponibles(data);
                    //console.log(data);
                }
            }
            
        })
    }

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    useEffect( ()=>{
        cargarCategoriaDisponibles()
    }, []);
    

    const crudCategoria = () => {
        return(
            <div className="">               
                <ul className="list-group">                   
                    <li className="list-group-item">
                        <Link className="nav-link btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2
                        " to="/categoria/Support/agregar">
                            Agregar Categoria
                        </Link>
                    </li>
                
                    
                </ul>
            </div>
        );
    };

    const mostrarCrud = () => {
        if(isAutentificacion() 
        && isAutentificacion().cliente.bAdmin){
            return(
                <div>
                    {crudCategoria()}
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
        <Layout titulo="Categorias" 
        descripcion="mantenimiento de categorias" 
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
            <div className="row">     
                                       
                {CategoriaDisponibles.map((Categoria, i)=>(
                    <CategoriaInterfaz key={i} Categoria={Categoria}/>
                ))}                   

            </div>
                
            

            
        </Layout>
    );
}

export default Categoria;