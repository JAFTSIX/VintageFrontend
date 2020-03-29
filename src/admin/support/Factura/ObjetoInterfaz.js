import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';
import ProductoInterfaz from './ProductoInterfaz';

import moment from 'moment';


const FacturaInterfaz = ({Factura}) => {

         

           const [test,setTest] = React.useState('no');

           const [Fecha,setFecha] = React.useState('date');
           
          const si_o_no = ()=>{
          
            if (  Factura.bMinTest) {
                setTest('sí')
            } else {
                setTest('no')
            }
          }

          const convertir_Fecha = ()=>{
         
            setFecha(moment(Factura.dFecha).format('DD/MM/YYYY, HH:mm:ss'))
          }
        
        
          useEffect( ()=>{
           si_o_no()
           convertir_Fecha()
        });
 

    return(
        
        <div className="mw-100 "  style={{ paddingTop: '3%'}}>
            <div className="row">
            {/* //info da factura */}
                <div  className="border-top col-lg-5" >   
                      
                      <h3 className="font-weight-bold" style={{display : 'inline'}}>Factura Id: </h3>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}>{Factura._id}</h5>
                    <br/>
                      <h3 className="font-weight-bold" style={{display : 'inline'}}>Fecha :</h3>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}} > {Fecha}</h5>
                      <br/>
                      <h3 className="font-weight-bold" style={{display : 'inline'}}>Id Cliente :</h3>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Factura.sCliente} </h5>
                      <br/>
                      <h3 className="font-weight-bold" style={{display : 'inline'}}>Subtotal:</h3>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Factura.iSubtotal}$ </h5>
                      <br/>
                      <h3 className="font-weight-bold" style={{display : 'inline'}}>Total:</h3>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Factura.iTotal}$ </h5>

                </div>
                {/* info de articulos comprados  */}
                    <div  className="col-lg-6 f-flex flex-row px-0">
                     
                        <a className="btn"   data-toggle="collapse" href={'#compras'+Factura._id} role="button" aria-expanded="false" aria-controls="collapseExample">   
                        <h5 className="font-weight-bold" style={{display : 'inline'}}>Articulos Comprados ▼</h5>  
                        </a>
                       

                
                        <div className="collapse" id={'compras'+Factura._id}>
                            <div className=" facturaArticulosComprados col-lg-12">
                                {Factura.aCompras.map((producto, i)=>(
                                    <ProductoInterfaz key={i} producto={producto}/>
                                ))}  
                            </div>
                                       
                        </div>
                    


                  
      
                      <p>
                      <a className="btn"   data-toggle="collapse" href={'#direccion'+Factura._id} role="button" aria-expanded="false" aria-controls="collapseExample">   
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Dirección ▼</h5>  
                      </a>
                    </p>

                
                        <div className="collapse" id={'direccion'+Factura._id}>
                        
                      
                        
                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Ciudad:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.sCiudad} </h3>
                
                      
                      
                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Dirección 1:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.sDireccion1} </h3>
                      </div>
                      
                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Dirección 2:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.sDireccion2} </h3>
                      </div>


                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Código postal:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.iCodPostal} </h3>
                      </div>

                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Teléfono:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.sTelefono} </h3>
                      </div>

                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Nombre:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.sNombre} </h3>
                      </div>

                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Apellido:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.sApellido} </h3>
                      </div>

                        </div>
                    </div>

                    </div>

        
                    {isAutentificacion() && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                         
                        <Link to={`/Factura/Support/actualizar/${Factura._id}`}>
                            <button className="btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2">
                                Modificar Factura
                            </button>
                        </Link>

                     
                    

                      
                      <Link to={`/Factura/Support/Eliminar/${Factura._id}`} >
                            <button  className="btn btn-outline-primary 
                            
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Factura
                            </button>
                            </Link>
                        
                        </Fragment>
                    )}
                    
                
            </div>
        </div>
    );
}

export default FacturaInterfaz;