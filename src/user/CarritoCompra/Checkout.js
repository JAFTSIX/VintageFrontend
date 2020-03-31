import React, {useState, useEffect} from 'react';
import Layout from '../../nucleo/Layout';
import { Link } from 'react-router-dom';
import {getProductosLocalStorage, actualizarCantidad, eliminarProductoCarrito} from './carritoHelper';
import '../../index.css';
import './carrito.css';

import DropIn from "braintree-web-drop-in-react";
import { PayPalButton } from "react-paypal-button-v2";
import {getObjeto,errorTranslator}from './../../admin/apiAdmin'

import { isAutentificacion } from './../../autentificacion/index';

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
        let getNonce=value.instance.requestPaymentMethod().then(data=>{

            console.log(data)
            nonce=data.nonce 
            //once you have the nonce(card type,car number) send nonce as  'paymentMethodNonce'    
            //and also total to be charged
            console.log('send nonce and total to process',nonce,getTotal())

        }).catch(error=>{
            console.log('error de verga', error)
            setError(errorTranslator( error.message ));
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
                }} onInstance={instance=>(value.instance=instance) }/>
            </div>  
                
                <button onClick={comprar} className="btn btn-outline-primary
                                agregarPadding mb-5">
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