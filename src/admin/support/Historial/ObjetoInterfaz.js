import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {isAutentificacion} from '../../../autentificacion/index';
import '../../../index.css';
import '../../../user/producto.css';
import '../support.css';


import moment from 'moment';




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
            setFecha(moment(Historial.dFecha).format('DD/MM/YYYY, HH:mm:ss'))
          }
        
        
          useEffect( ()=>{
           si_o_no()
           convertir_Fecha()
        });

    return(
        <div className=""  style={{ paddingTop: '2%'}}>

                <div  className="border-top d-flex flex-column" >
             

                    {/* titulo  */}
           
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Id: </h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}} >{Historial._id}</h5>

                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Fecha: </h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}} > {Fecha}</h5>

                      <h5 className="font-weight-bold" style={{display : 'inline'}}>¿Permaneció más de 2 minutos?</h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {test}</h5>

                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Duración :</h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Historial.iDuracion} segundos </h5>
   
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Id Cliente :</h5>  
                      <h5 className="font-weight-normal" style={{display : 'inline'}}> {Historial.sCliente} </h5>
   
                      <h5 className="font-weight-bold" style={{display : 'inline'}}>Id Receta :</h5>  
                      <h5 className="font-weight-normal"style={{display : 'inline'}}> {Historial.sReceta} </h5>

                      


        
                    {isAutentificacion() && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                        {/* // aqui se pasa el id del Historial en el url para actualizar */}

                     
                    

                      
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
    )
}

export default HistorialInterfaz;