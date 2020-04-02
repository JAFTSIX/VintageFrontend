import React, {useState, useEffect,useReducer, parentCallback } from 'react';
import Layout from '../../nucleo/Layout';
import { Link } from 'react-router-dom';
import {getProductosLocalStorage,SetProductosCarrito,eliminarTodoProductoCarrito} from './carritoHelper';
import '../../index.css';
import './carrito.css';
//import CarritoInterfaz from './CarritoInterfaz';
import Checkout from './Checkout';

const useForceRerender = () => useReducer(state => !state, false)[1];


const Carrito = () => {
    const [producto, setProducto] = useState([]);
    const forceRerender = useForceRerender();
    const [Success2, setSuccess2] = useState(false);

    useEffect(()=>{

       
        //llamar a la funcion ubicado en carritoHelper
        
            setProducto(getProductosLocalStorage());      
         
    
    }, []);


    const handleChange = (productoId,accion) => event => {
        
        var arrayP=producto
    
        if(accion===1){
            // funcion de carritoHelper 
            
            for (let x = 0; x < arrayP.length; x++) {
                if (arrayP[x]._id===productoId) {
                    console.log('encontrado')
                    arrayP[x].iCant=parseInt( event.target.value);  
                    
                }
                
            }
            
            console.log('accion update cant')
            //setValues({...values,error: false, [campo]: event.target.value});
        }else if(accion===2){
            console.log('accion delete ')
            for (let x = 0; x < arrayP.length; x++) {
                if (arrayP[x]._id===productoId) {
                    console.log('encontrado')
                    
                    arrayP.splice(x, 1);
                }
                
            }
        }
        console.log(arrayP,'  tipo=>', typeof arrayP)
        setProducto(arrayP)
        SetProductosCarrito(arrayP)
        forceRerender()
        //window.location.reload(false);
    }


  
 


    const CarritoInterfaz=({index})=>{
 
        
        return(     
            <div className="row">
                

                <div className="col-lg-5 col-md-3 mb-lg-3">
                    <div className="d-lg-inline-flex ml-lg-5 ml-md-1 mt-lg-5 mt-md-1 ">
                        <h1 className="text-capitalize">{producto[index].sNombre}</h1>
                    </div>
                    <img className="imgCarrito" src={producto[index].sUrlImagen} />

                </div>  
                
                <hr />
                {producto[index].recetaOProducto ===0 &&(
                    // {/* cantidad  */}
                    <div className="col-lg-1 col-md-3 text-center d-flex justify-content-center aslign-items-center"><h3>
                    
                    

                    <div className="input-group mb-3">
                
                        <input type="number" 
                        maxlength="1" size="1"
                      
                        className="form-control inputSize" 
                        value={producto[index].iCant} 
                        onChange={handleChange(producto[index]._id,1)} />
     
                
                    </div>

                    
                    </h3></div>
                )}
                
                {/* precio unidad  */}
                <div className="col-lg-2 col-md-2 text-center d-flex justify-content-center align-items-center"><h3>${producto[index].iPrecio}</h3></div>
                {/* precio total  */}
                <div className="col-lg-3 col-md-2 text-center d-flex justify-content-center align-items-center" ><h3>${ producto[index].iCant * producto[index].iPrecio }</h3></div>
                {/* icono eliminar producto  */}
                <div className="col-lg-1 col-md-2  text-center d-flex justify-content-center align-items-center">
                <button class="customBtnCart"
                    onClick={handleChange(producto[index]._id,2)}>
                    <img src="https://cdn3.iconfinder.com/data/icons/iconano-text-editor/512/005-X-512.png" className="iconoEliminarCarrito"/>
                    {/* Eliminar Producto */}
                </button>
                 
                </div>
                 
            </div>

    );
    }

    const handleState = (booleano) => {
     
        if(booleano){

            eliminarTodoProductoCarrito();
            
            setSuccess2(booleano)
        }
    }

    // Funcion que muestra todos los productos 
    const mostrarProducto = () => {
        console.log('averputo');
        return(
            <div>   
            <div id="tabla" className="mb-3 row px-5" >
            {/* displayNone : en tablet y mobil no va a aparecer esto */}
                    <div className="col-lg-5 displayNone pl-5">PRODUCTOS</div>
                    <div className="col-lg-1 text-center displayNone">CANTIDAD</div>
                    <div className="col-lg-2 text-center pl-5 displayNone">PRECIO / UNIDAD</div>
                    <div className="col-lg-3 text-center pl-5 displayNone">PRECIO TOTAL</div> 
            </div>

            {

                
                Success2?(<div></div>):(producto.map((product, i)=>(
                    <CarritoInterfaz key={i} index={i}/>
                )))
            } 

                <div className="text-right">
                    <Checkout products={producto} Change={handleState} />
                    
                    
                </div>

            </div>
        )
    };


    // Funcion que muestra si no hay productos 
    const noProductoMensaje = () => {
        return(
            <div className="text-center mb-5">
                <h2>Carrito de Compra esta vacío</h2>
                <h3><Link to="../producto">Continúa Comprando... </Link></h3>
                <img height="300px" width="300px" src="https://i.pinimg.com/originals/f1/ad/41/f1ad41a237e46b6fc147be8674ad216f.png"/>
            </div>
        );
    };

    

    return (    
         
        <Layout jumbotron="jumbotronMovimiento"
        image="https://www.tastefinewines.co.uk/wp-content/uploads/2018/11/gifts-for-christmas.jpg"
         titulo="CARRITO DE COMPRA" 
        descripcion="Chef Selenia Mendez"   
        className="container-fluid">

            <div className="row mt-5">
                <div className="col-12">
                    
                    {/* if si hay productos en el carrito o no  */}
                    {producto.length > 0 ? mostrarProducto() : noProductoMensaje()}


                </div>
                
            </div>
            
        </Layout>
    );

    
}

export default Carrito;