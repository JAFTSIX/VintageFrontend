import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';
import ProductoInterfaz from './ProductoInterfaz';




const FacturaInterfaz = ({Factura}) => {

           //to={`/Factura/Support/Eliminar/${Factura._id}`}

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
            var visita = new Date(Factura.dFecha);
            var day = visita.getDate() + "";
            var month = (visita.getMonth() + 1) + "";
            var year = visita.getFullYear() + "";
            var hour = visita.getHours() + "";
            var minutes = visita.getMinutes() + "";
            var seconds = visita.getSeconds() + "";

            setFecha(day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds)
          }
        
        
          useEffect( ()=>{
           si_o_no()
           convertir_Fecha()
        });

    return(
        <div className="mw-100"  style={{ paddingTop: '5%'}}>
            <div className="row">
                <div  className="border-top" >
             

                    {/* titulo  */}
                    
                    
                    

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
                      <a className="btn"   data-toggle="collapse" href={'#columna'+Factura._id} role="button" aria-expanded="false" aria-controls="collapseExample">   
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>cosas compradas ▼</h5>  
                      </a>
                    </p>

                   {/*el card body */}
                    <div className="collapse" id={'columna'+Factura._id}>
               
                    {Factura.aCompras.map((producto, i)=>(
                        <ProductoInterfaz key={i} producto={producto}/>
                    ))}  
                       Aca va toda esa madre
                     
                    </div>
                   
                    </div>


                      {/*

                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>identificador de Receta:</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Factura.sReceta} </h3>
                      </div>*/
                    }


        
                    {isAutentificacion() && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                        {/* // aqui se pasa el id del Factura en el url para actualizar */}
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