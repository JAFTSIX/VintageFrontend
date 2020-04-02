import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import { isAutentificacion } from '../autentificacion';
import { Link } from 'react-router-dom'; 
import ProductoInterfaz from './ProductoInterfaz';
import '../index.css';
import '../css.css';
import {errorTranslator,getObjeto} from './../admin/apiAdmin'; 

const Producto = () => {
    //const [productoVendidos, setProductoVendidos] = useState([]);
    const [productoDisponibles, setProductoDisponibles] = useState([]);
    const [error, setError] = useState(false);

    //cargar productos para visualizar
    
    const cargarProductoDisponiles = () => {

        getObjeto('Articulo')
        .then((data={error:{message:'hay un problema, intente más tarde'}})=>{
            
        ('error' in data) ?setError(errorTranslator(data.error.message)): setProductoDisponibles(data);                                                                                     
       
        })
      
    }

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    useEffect(()=>{
        
        cargarProductoDisponiles()
    }, []);
    

    const crudProducto = () => {
        return(
            <div className="">               
                <ul className="list-group">                   
                    <li className="list-group-item border-0 mw-100 p-0 mb-5 mt-3">
                        <Link className="btn btn-outline-primary 
                            m-2 agregarPadding 
                        " to="/producto/agregar">
                            Agregar Producto
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
                    {crudProducto()}
                </div>
            );
        }else{
            return( <div>
                
            </div>);
        }
    }

    return (
        
        <Layout jumbotron="jumbotronMovimiento"
        image="https://cdn.shopify.com/s/files/1/1856/9027/products/il_fullxfull.1464035132_oar9_530x@2x.jpg?v=1522332447"
         titulo="PRODUCTOS" 
        descripcion="Chef Selenia Mendez"   
        className="container-fluid">
            
            {/* funciones de admin */}
            <div className="row mt-5">
                <div className="col-12">                       
                    {mostrarCrud()}
                </div>
            </div>
            
            {/* contenido principal */}
        
            <div className="row mb-5">     
                                       
                {productoDisponibles.map((producto, i)=>(
                    <ProductoInterfaz key={i} producto={producto}/>
                ))}                   

            </div>
                
            

            
        </Layout>
    );
}

export default Producto;