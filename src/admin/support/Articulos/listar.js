import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import { isAutentificacion } from '../../../autentificacion/index';
import { Link } from 'react-router-dom';
import {getObjeto} from '../../apiAdmin';
import FacturaInterfaz from './ObjetoInterfaz';
import '../../../index.css'



const Factura = () => {
    
    const [FacturaDisponibles, setFacturaDisponibles] = useState([]);
    const [error, setError] = useState(false);
   

    
    
    const cargarFacturaDisponibles = () => {
        getObjeto('Factura')
        .then(data=>{
            if (data === undefined) {
                setValor({
                  ...valor,
                  error:'Problemas, intente más tarde'
                });
              } else{
                if('error'in data){
                    setError(errorTranslator(data.error.message) )
                }else{
                    setFacturaDisponibles(data.value);
                    //console.log(data);
                }
              }
            
        })
    }

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    useEffect( ()=>{
        cargarFacturaDisponibles()
    }, []);
    

    const crudFactura = () => {
        return(
            <div className="">               
                <ul className="list-group">                   
                    <li className="list-group-item">
                        <Link className="nav-link btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2
                        " to="/Factura/Support/agregar">
                            Agregar Factura
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
                    {crudFactura()}
                </div>
            );
        }else{
            return("");
        }
    }

    return (
        <Layout titulo="FacturaS" 
        descripcion="Chef Selenia Mendez" 
        className="container-fluid">
            
            {/* funciones de admin */}
            <div className="row">
                <div className="col-9">                   
                    {mostrarCrud()}
                </div>
            </div>
            
            {/* contenido principal */}
        <br></br>
            <div className="row">     
                                       
                {FacturaDisponibles.map((Factura, i)=>(
                    <FacturaInterfaz key={i} Factura={Factura}/>
                ))}                   

            </div>
                
            

            
        </Layout>
    );
}

export default Factura;