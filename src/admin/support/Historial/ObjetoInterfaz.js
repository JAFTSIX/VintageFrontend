import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';





const HistorialInterfaz = ({Historial}) => {

           //to={`/Historial/Support/Eliminar/${Historial._id}`}

           const [test,setTest] = React.useState('no');

           const [Fecha,setFecha] = React.useState('date');
           
          const si_o_no = ()=>{
          
            if (  Historial.bMinTest) {
                setTest('sí')
            } else {
                setTest('no')
            }
          }

          const convertir_Fecha = ()=>{
            var visita = new Date(Historial.dFecha);
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
                      <h3 className="font-weight-normal" style={{display : 'inline'}} >{Historial._id}</h3>
                    
                    </div>
                      
                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>¿cuando pasó? :</h4>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}} > {Fecha}</h3>
                      </div> 
                      
                      <div  class=""> 
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>¿permaneció más de 2 minutos? :</h4>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}}> {test}</h3>
                      </div> 
                      
                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>duración :</h4>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}}> {Historial.iDuracion}s </h3>
                      
                      </div>

                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>identificador de cliente :</h4>  
                      <h3 className="font-weight-normal" style={{display : 'inline'}}> {Historial.sCliente} </h3>
                      </div>

                      <div  class="">
                      <h4 className="font-weight-bold" style={{display : 'inline'}}>identificador de Receta :</h4>  
                      <h3 className="font-weight-normal"style={{display : 'inline'}}> {Historial.sReceta} </h3>
                      </div>
                      


        
                    {isAutentificacion() && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                        {/* // aqui se pasa el id del Historial en el url para actualizar */}
                        <Link to={`/Historial/Support/actualizar/${Historial._id}`}>
                            <button className="btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2">
                                Modificar Historial
                            </button>
                        </Link>

                     
                    

                      
                      <Link to={`/Historial/Support/Eliminar/${Historial._id}`} >
                            <button  className="btn btn-outline-primary 
                            
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Historial
                            </button>
                            </Link>
                        
                        </Fragment>
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default HistorialInterfaz;