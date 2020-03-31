import React, {useState, useEffect} from 'react';
import Layout from '../../nucleo/Layout';
import { Link } from 'react-router-dom';
import {getProductosLocalStorage, actualizarCantidad, eliminarProductoCarrito} from './carritoHelper';
import '../../index.css';
import './carrito.css';

import DropIn from "braintree-web-drop-in-react";
import { PayPalButton } from "react-paypal-button-v2";
import {getObjeto,insertObject,errorTranslator}from './../../admin/apiAdmin'

import { isAutentificacion } from './../../autentificacion/index';
import moment from 'moment';

const Checkout = ({products}) => {
         
    const [value,setValue]=useState({
        success:false,
        clientToken:null,
    
        instance:{},
        address:''
    })
    const [error, setError] = useState(false);

    
    useEffect(()=>{
        getToken()
        
    }, []);

    const getToken = (query='') => {
      

        getObjeto('Factura/compra/BT',query)
        .then((data={error:{message:'hay un problema, intente más tarde'}})=>{
            
                if ('error' in data) {

                    setError(errorTranslator(data.error.message))        
                    
                }else{
          
                    setValue({...value,clientToken:data.value.clientToken       });
                    console.log(data.value);
                                                             
                }
       
        })
    }


    const comprar=()=>{
        //send the nonce to your server
        //nonce=data.instance.requestPaymentMethod
        let nonce;
        let getNonce=value.instance.requestPaymentMethod().then(dataX=>{

            console.log(dataX)
            nonce=dataX.nonce 
            //once you have the nonce(card type,car number) send nonce as  'paymentMethodNonce'    
            //and also total to be charged
            


            const aver=insertObject('Factura',{
                Factura: {
            sCliente:  isAutentificacion().cliente._id,
            dFecha: moment().format(),
            aCompras:products,
            iSubtotal: 0,
            iTotal: 0,
           
            oDireccion: { sCiudad: "San Jose",
            sDireccion1: "de la farmacia sucre 200 metros en el reestaurante el pueblo",
            sDireccion2: "de la farmacia sucre 100 metros en el reestaurante el pollo",
            iCodPostal: "10101",
            sTelefono: "88442252",
            sNombre: "Ignacio",
            sApellido: "pepe"}
        }
        ,
            paymentMethodNonce:nonce,}).then(dataY=>{

                   console.log('LLEGAMOS',dataY)
                   if ('error'in dataY) {
                    setError(errorTranslator( dataY.error.message ));
                   }
            }).catch(errorY=>{
                console.log('error de vergaY', errorY)
                setError(errorTranslator( errorY.message ));
            })


        }).catch(errorX=>{
            console.log('error de vergaX', errorX)
            setError(errorTranslator( errorX.message ));
        })
    }

    {/* calcular el total de carrito de compra  */}
    const getTotal = () => {

        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total = total+products[i].count * products[i].iPrecio;    
            
        }

        return total;
    }

    {/* calcular total de producto  */}
    const getTotalProductos = () => {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total=total+parseInt(products[i].count);
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

    
        <div onBlur={()=>setError(false)}>
        {value.clientToken !==null&& products.length>0 ? (
        <div>
            
            <div>
                <DropIn options={{
                    authorization:value.clientToken
                }} onInstance={instance=>(value.instance=instance)  }/>
            </div>  
                
                <button onClick={comprar} className="btn btn-outline-primary
                                agregarPadding mb-5 btn block">
                                <h4>pagar</h4> 
                    </button>


        </div>
         ):null }
        </div>
        );

        const mostrarError = () => (
            <div className="alert alert-danger" 
            style={{display: error ? '' : 'none'}}>
                {error}
               
            </div>
            
        );

    return <div>

    {mostrarError()}
                {/* calcular total de producto  */}
                <h1>Total de Productos: {getTotalProductos()}</h1>
                {/* calcular el total de carrito de compra  */}
                <h1>Total: ₡{getTotal()}</h1>
               {/*<PayPalButton

                        amount={getTotal()}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {
                        alert("Transacción Completada");
                
                        // OPTIONAL: Call your server to save the transaction
                        return fetch("/paypal-transaction-complete", {
                            method: "post",
                            body: JSON.stringify({
                            orderID: data.orderID
                            })
                        });
                        }}
                    />  */}


                    {showCheckOut()}

 

        </div>
}

export default Checkout;