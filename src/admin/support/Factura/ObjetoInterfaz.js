import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';
import ProductoInterfaz from './ProductoInterfaz';
import '../support.css';
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
                <div  className="border-top col-lg-5 facturaLineHeight" >   
                      
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Factura Id: </h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}>{Factura._id}</h5>
                    <br/>
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Fecha :</h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}} > {Fecha}</h5>
                      <br/>
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Id Cliente :</h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Factura.sCliente} </h5>
                      <br/>
                      <h5 className="font-weight-bold " style={{display : 'inline'}}>Cliente :</h5>  
                      <h5 className="font-weight-normal text-capitalize" style={{display : 'inline'}}> {Factura.oDireccion.nombre} {Factura.oDireccion.apellido}</h5>
                      <br/>
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Correo Electronico :</h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Factura.oDireccion.correo} </h5>
                      <br/>
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Subtotal:</h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Factura.iSubtotal}$ </h5>
                      <br/>
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Total:</h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Factura.iTotal}$ </h5>

                </div>
                {/* info de articulos comprados  */}
                    <div  className="col-lg-6 f-flex flex-row px-0 facturaLineHeight">
                     
                        <a className="text-dark ml-md-3"   data-toggle="collapse" href={'#compras'+Factura._id} role="button" aria-expanded="false" aria-controls="collapseExample">   
                        <h5 className="font-weight-bold" style={{display : 'inline'}}>Articulos Comprados ▼</h5>  
                        </a>
                
                        <div className="collapse" id={'compras'+Factura._id}>
                            <div className=" facturaArticulosComprados col-lg-12">
                                {Factura.aCompras.map((producto, i)=>(
                                    <ProductoInterfaz class="imgFactura" key={i} producto={producto}/>
                                ))}  
                            </div>
                                       
                        </div>
                    
                      <p>
                      <a className="text-dark ml-md-3"   data-toggle="collapse" href={'#direccion'+Factura._id} role="button" aria-expanded="false" aria-controls="collapseExample">   
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Dirección ▼</h5>  
                      </a>
                    </p>
               
                    <div className="collapse mb-5 pl-5" id={'direccion'+Factura._id}>
                        <div  class="">
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Provincia:</h5>  
                      <p className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.provincia} </p>
                      </div>
                      <div  class="">
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Canton:</h5>  
                      <p className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.canton} </p>
                      </div>                      
                      
                      <div  class="">
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Dirección 1:</h5>  
                      <p className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.direccion1} </p>
                      </div>
                      
                      <div  class="">
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Dirección 2:</h5>  
                      <p className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.direccion2} </p>
                      </div>


                      <div  class="">
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Código postal:</h5>  
                      <p className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.codPostal} </p>
                      </div>

                      <div  class="">
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Teléfono:</h5>  
                      <p className="font-weight-normal"style={{display : 'inline'}}> {Factura.oDireccion.telefono} </p>
                      </div>

                       
                    </div>

                    </div>
            </div>
            <div class="row">
                <div class="d-flex flex-row w-100 flex-wrap" >
                    {isAutentificacion() && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                            <div class="col-lg-6 col-sm-12">
                            <Link to={`/Factura/Support/actualizar/${Factura._id}`}>
                                <button className="btn btn-outline-primary w-100">
                                    Modificar Factura   
                                </button>
                            </Link>
                            </div>
                            <div class="col-lg-6 col-sm-12">
                            <Link to={`/Factura/Support/Eliminar/${Factura._id}`} >
                                <button  className="btn btn-outline-primary w-100" data-toggle="modal" data-target="#exampleModal">
                                    Eliminar Factura
                                </button>
                            </Link>
                            </div>
                            
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FacturaInterfaz;