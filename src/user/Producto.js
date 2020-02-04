import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import { isAutentificacion } from '../autentificacion';
import { Link } from 'react-router-dom';
import {getProductoG} from './apiProducto';
import ProductoInterfaz from './ProductoInterfaz';


const Producto = () => {
    //const [productoVendidos, setProductoVendidos] = useState([]);
    const [productoDisponibles, setProductoDisponibles] = useState([]);
    const [error, setError] = useState(false);

    //cargar productos para visualizar
    
    const cargarProductoDisponiles = () => {
        getProductoG('bActivo')
        .then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProductoDisponibles(data);
                console.log(data);
            }
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
                    <li className="list-group-item">
                        <Link className="nav-link btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2
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
        && isAutentificacion().sContrasena==="123" 
        && isAutentificacion().sCorreo==="sele"){
            return(
                <div>
                    {crudProducto()}
                </div>
            );
        }else{
            return("");
        }
    }

    return (
        <Layout titulo="PRODUCTOS" 
        descripcion="Chef Selenia" 
        className="container-fluid">
            
            {/* funciones de admin */}
            <div className="row">
                <div className="col-9">                   
                    {mostrarCrud()}
                </div>
            </div>
            
            {/* contenido principal */}
        
            <div className="row">     
                                       
                {productoDisponibles.map((producto, i)=>(
                    <ProductoInterfaz key={i} producto={producto}/>
                ))}                   

            </div>
                
            

            
        </Layout>
    );
}

export default Producto;