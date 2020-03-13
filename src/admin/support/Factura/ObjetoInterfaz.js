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
        <div className="mw-100"  style={{ paddingTop: '5%'}}>
            <div className="row">
                <div  className="border-top" >
             

                   
                    
                    
                    

                    <div  class="">
                      
                      <h3 className="font-weight-bold" style={{display : 'inline'}}>id :</h3>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}} >{Factura._id}</h3>
                    
                    </div>
                      
                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>¿cuando pasó? :</h4>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}} > {Fecha}</h3>
                      </div> 
                      

                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>identificador de cliente :</h4>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}}> {Factura.sCliente} </h3>
                      </div>

 
                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Subtotal:</h4>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}}> {Factura.iSubtotal}$ </h3>
                      
                      </div>

                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>total:</h4>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}}> {Factura.iTotal}$ </h3>
                      
                      </div>


                      <div  className="">
                      <p>
                      <a className="btn"   data-toggle="collapse" href={'#compras'+Factura._id} role="button" aria-expanded="false" aria-controls="collapseExample">   
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>cosas compradas ▼</h5>  
                      </a>
                    </p>

                
                        <div className="collapse" id={'compras'+Factura._id}>
               
                        {Factura.aCompras.map((producto, i)=>(
                            <ProductoInterfaz key={i} producto={producto}/>
                        ))}  
                                       
                        </div>
                    </div>


                  
                      <div  className="">
                      <p>
                      <a className="btn"   data-toggle="collapse" href={'#direccion'+Factura._id} role="button" aria-expanded="false" aria-controls="collapseExample">   
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Dirección ▼</h5>  
                      </a>
                    </p>

                
                        <div className="collapse" id={'direccion'+Factura._id}>
                        
                      
                        
                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>Ciudad:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.sCiudad} </h3>
                      </div>
                      
                      
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
        </div>
    );
}

export default FacturaInterfaz;