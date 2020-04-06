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
                <img className="imgCarrito " src={producto[index].sUrlImagen} />
                <h5 className="text-capitalize col-2 carritoFlex">{producto[index].sNombre}</h5>
                
                
                <hr />
                {/* Si es una receta la cantidad siempre va ser 1  */}
                {producto[index].recetaOProducto === 1 &&(
                    <div className="carritoFlex">
                        <h5 className="col-2 carritoFlex"><label>{producto[index].iCant=1}</label></h5>
                    </div>
                    
                )}
                {producto[index].recetaOProducto ===0 &&(
                    // {/* cantidad  */}
                    <div className="carritoFlex"><h5>

                    <div className="input-group  carritoFlex">
                
                        <input type="number" 
                        maxlength="1" size="1"
                      
                        className="form-control inputSize" 
                        value={producto[index].iCant} 
                        onChange={handleChange(producto[index]._id,1)} />    
                
                    </div>
                    </h5></div>
                )}  
                
                
                
                {/* precio unidad  */}
                <div className="col-2 mt-lg-2 carritoFlex"><h5>${producto[index].iPrecio}</h5></div>
                {/* precio total  */}               
                <div className="col-2 mt-lg-2 carritoFlex" ><h5>${ producto[index].iCant * producto[index].iPrecio }</h5></div>
                {/* icono eliminar producto  */}
                <div className="col-1 mt-lg-2 carritoFlex">
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
            <div className="row">  
            <div className="col-lg-7"> 
                <div id="tabla" className="mb-3 row px-5" >
                {/* displayNone : en tablet y mobil no va a aparecer esto */}
                        <div className="displayNone mx-auto">IMAGEN</div>
                        <div className="displayNone mx-auto">PRODUCTOS</div>
                        <div className="displayNone  mx-auto">CANTIDAD</div>
                        <div className="displayNone  mx-auto">PRECIO / UNIDAD</div>
                        <div className="displayNone  mx-auto">PRECIO TOTAL</div> 
                </div>
            


            {
                
                Success2?(<div></div>):(producto.map((product, i)=>(
                        <CarritoInterfaz key={i} index={i}/>                   
                )))
            } 
            </div>

                <div className="col-lg-5 text-right">
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