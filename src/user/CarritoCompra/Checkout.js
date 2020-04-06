import React, {useState, useEffect,} from 'react';
import Layout from '../../nucleo/Layout';
import { Link } from 'react-router-dom';
import {getProductosLocalStorage, actualizarCantidad, eliminarProductoCarrito} from './carritoHelper';
import '../../index.css';
import './carrito.css';

import { Redirect} from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import { PayPalButton } from "react-paypal-button-v2";
import {getObjeto,insertObject,errorTranslator}from './../../admin/apiAdmin'

import { isAutentificacion } from './../../autentificacion/index';
import moment from 'moment';

const Checkout = ({products,Change}) => {
    
    const [direccion, setDireccion]=useState({
        provincia:isAutentificacion().cliente.oDireccion.provincia,
        canton:isAutentificacion().cliente.oDireccion.canton,
        direccion1:isAutentificacion().cliente.oDireccion.direccion1,
        direccion2:isAutentificacion().cliente.oDireccion.direccion2,
        codPostal:isAutentificacion().cliente.oDireccion.codPostal,
        telefono:isAutentificacion().cliente.oDireccion.telefono,
        nombre: isAutentificacion().cliente.sNombre,
        apellido: isAutentificacion().cliente.sApellido,
        correo: isAutentificacion().cliente.sCorreo
    });
    const [value,setValue]=useState({
        
        clientToken:null,
    
        instance:{},
        address:''
    })
    const [errorCheck, setErrorCheck] = useState(false);
    const [success, setSuccess] = useState(false);    
    const [redireccionar, setRedireccionar] = useState(false);

    // destructive
    const{
        provincia,
        canton,
        direccion1,
        direccion2,
        codPostal,
        telefono,
        nombre,
        apellido,
        correo
    }=direccion;

    useEffect(()=>{
        console.log('changeeee->',Change)
        getToken()
        
    }, []);

    const getToken = (query='') => {
      

        getObjeto('Factura/compra/BT',query)
        .then((data={error:{message:'hay un problema, intente más tarde'}})=>{
            
                if ('error' in data) {

                    setErrorCheck(errorTranslator(data.error.message))        
                    
                }else{
          
                    setValue({...value,clientToken:data.value.clientToken});
                    //console.log(data.value);
                     console.log("factura"+value.clientToken)                                            
                }
       
        })
    }


    const comprar=()=>{
       // console.log('ValueZ',products)
        //console.log('ValueZ',value)
        //send the nonce to your server
        //nonce=data.instance.requestPaymentMethod
        let nonce;
        let getNonce=value.instance.requestPaymentMethod().then(dataX=>{

           // console.log('dataX',dataX)
            nonce=dataX.nonce 
            //once you have the nonce(card type,car number) send nonce as  'paymentMethodNonce'    
            //and also total to be charged
            

            //comprar
            const aver=insertObject('Factura',{
            Factura: {
                sCliente:  isAutentificacion().cliente._id,
                dFecha: moment().format(),
                aCompras:products,
                iSubtotal: 0,
                iTotal: 0,
            
                oDireccion: {
                    provincia:provincia,
                    canton:canton,
                    direccion1:direccion1,
                    direccion2:direccion2,
                    codPostal:codPostal,
                    telefono:telefono,
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo
                }
            }
        ,
            paymentMethodNonce:nonce,}).then(dataY=>{

                   //console.log('LLEGAMOS',dataY)
                if('error'in dataY){
                    Change(false);
                    setErrorCheck(errorTranslator( dataY.error.message ));
                }else if ('errors'in dataY.value) {
                    Change(false);
                    setErrorCheck(errorTranslator( dataY.value.message ));
                   }else if( dataY.value.success){
                        
                        setSuccess(true)
                        
                        setValue({
        
                            clientToken:null,
                        
                            instance:{},
                            address:''
                        })

                        
                        Change(true);
                   
                   }
           


            }).catch(errorY=>{
                console.log('error de vergaY', errorY)
                setErrorCheck(errorTranslator( errorY.message ));
                Change(false);
            })


        }).catch(errorX=>{
            console.log('error de verga X', errorX)
            setErrorCheck(errorTranslator( errorX.message ));
             
            Change(false);
        })
    }

    {/* calcular el total de carrito de compra  */}
    const getTotal = () => {

        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total= total +(products[i].iCant*products[i].iPrecio);
            
        }

        return total;
    }

    {/* calcular total de producto  */}
    const getTotalProductos = () => {

        let total = 0;
        
        for (let i = 0; i < products.length; i++) {
            total= total +products[i].iCant;
        }
        return total;
    }

    const  showCheckOut=()=>{
        return isAutentificacion()?(
            <div >{showDropIn()}</div>
        ):(
            <Link to="/SignIn">Checkout</Link>
        )
    }

    const  showDropIn=()=>(

    
        <div onBlur={()=>setErrorCheck(false)}>
        {value.clientToken !==null&& products.length>0 ? (
        <div>
            
            <div>
                <DropIn options={{
                    authorization:value.clientToken
                }} onInstance={instance=>(value.instance=instance)  }/>
            </div>  
                
                <button onClick={comprar} className="btn btn-outline-primary
                                agregarPadding mb-5 btn block">
                                <h4>Pagar</h4> 
                </button>
               

        </div>
         ):null }
        </div>
        );

        const mostrarError = () => (
            <div className="alert alert-danger" 
            style={{display: errorCheck ? '' : 'none'}}>
                {errorCheck}
               
            </div>
            
        );


        
        const mostrarExito = () => (
            <div className="alert alert-info" 
            style={{display: success ? '' : 'none'}}>
                Transacción exitosa, ¡Gracias por comprar!
               
            </div>
            
        );

        //cambiar la direccion o poner la direccion antes del pago
        const handleChange = name => event => {
            setDireccion({...direccion, [name]:  event.target.value});
            console.log(direccion)
        }

        const direccionForm = () => (
            <form className="text-left">
                <div className="form-group mt-30 ">
                    <label className="text-muted">
                        Provincia 
                    </label>
                    <input name="provincia" onChange={handleChange('provincia')}  type="text" 
                        className="form-control" value={provincia}/>
                </div>
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Cantón 
                    </label>
                    <input name="canton" onChange={handleChange('canton')}  type="text" 
                        className="form-control" value={canton}/>
                </div>
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Dirección 1 
                    </label>
                    <input name="direccion1" onChange={handleChange('direccion1')}  type="text" 
                        className="form-control" value={direccion1}/>
                </div>
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Dirección 2 
                    </label>
                    <input name="direccion2" onChange={handleChange('direccion2')}  type="text" 
                        className="form-control" value={direccion2}/>
                </div>
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Código Postal 
                    </label>
                    <input name="codPostal" onChange={handleChange('codPostal')}  type="text" 
                        className="form-control" value={codPostal}/>
                </div>
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Teléfono 
                    </label>    
                    <input name="telefono" onChange={handleChange('telefono')}  type="text" 
                        className="form-control" value={telefono}/>
                </div>
    
            </form>
            
                
        );

     

    return <div className="bgCheckout">    

       
                {console.log(direccion)}
               {mostrarError()}
                 {mostrarExito()}

                    {direccionForm()}
                    <div className="mb-5 text-danger">*Recuerda, si no desea ingresar ingresar los datos de la direccion cada vez que se realiza una compra
                        puedes registrarlo en el perfil.
                    </div>
                    {showCheckOut()}

                    {/* calcular total de producto  */}
                <h1>Total de Productos: {getTotalProductos()}</h1>
                {/* calcular el total de carrito de compra  */}
                <h1>Total: ${getTotal()}</h1>

                    

        </div>
}

export default Checkout;