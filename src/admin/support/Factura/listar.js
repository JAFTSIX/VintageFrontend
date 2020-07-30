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
                        data=data.value;   
                        console.log(data);
                        for (let index = 0; index < data.length; index++) {
                            console.log( typeof data[index].aCompras,'->',data[index].aCompras);
                            
                        }
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
        image="https://i.imgur.com/jQ93wPR.jpg"
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