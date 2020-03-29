import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import { isAutentificacion } from '../../../autentificacion/index';
import { Link } from 'react-router-dom';
import {getObjeto,errorTranslator} from '../../apiAdmin';
import FacturaInterfaz from './ObjetoInterfaz';
import '../../../index.css';
import '../support.css';



const Factura = () => {
    
    const [FacturaDisponibles, setFacturaDisponibles] = useState([]);
    const [error, setError] = useState(false);
   

    
    
    const cargarFacturaDisponibles = () => {
        getObjeto('Factura')
            .then(data => {

                if (data === undefined) {

                    setError('Problemas, intente mas tarde')
                } else {
                    if ('error' in data) {
                        setError(errorTranslator(data.error.message))
                    } else {
                        setFacturaDisponibles(data);
                    }
                }
            })
    }

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    useEffect( ()=>{
        cargarFacturaDisponibles()
    }, []);
    
 

  


    
    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
           
        </div>
        
    );
    return (
        <Layout 
        jumbotron="jumboEstatico" 
        image="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-0/p640x640/71714792_3167053093321649_966614477665468416_o.jpg?_nc_cat=108&_nc_sid=8024bb&_nc_ohc=VDtLBEQdCG8AX-nxYMn&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=6&oh=9f5b0923fccb9fec875e9bafc6450a3f&oe=5EA865B9"
        titulo="Factura" 
        descripcion="Chef Selenia Mendez"   
        className="container-fluid">
        
            {/* funciones de admin */}
            <div className="row">
                <div className="col-9">                   
                {mostrarError()}
               
                </div>
            </div>
            
            {/* contenido principal */}
        <br></br>
        <div  className="col-12">
        
            <div className="table table-borderless facturaTabla">     
                                       
                {FacturaDisponibles.map(  
                    (Factura, i)=>(
                    <FacturaInterfaz key={i} Factura={Factura}/>
                    )
                
                )}                   

            </div>
            </div>        
            

            
        </Layout>
    );
}

export default Factura;