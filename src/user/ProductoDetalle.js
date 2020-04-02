import React, {useState, useEffect, Fragment} from 'react';

import '../index.css';
import '../css.css';
import './videoReceta.css';
import {isAutentificacion} from '../autentificacion/index';
import { Link,Redirect } from 'react-router-dom';
import { getObjeto} from './../admin/apiAdmin';
import Menu from '../nucleo/Menu';  
import EliminarProducto from '../admin/EliminarProducto';
import {agregarProductoCarrito} from './CarritoCompra/carritoHelper';


const ProductoDetalle = (props) => {
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);

    // funcion agregar carrito 
    const [redirect, setRedirect] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    const agregarCarrito = () => {
        // parametros -> el producto que viene del prop y el cb function 
   
        agregarProductoCarrito(producto,0, ()=>{
            setRedirect(true);
            setMensaje(true);
        });

        // que desaparezca en 2 seg     
        setTimeout(() => {
            setMensaje(false);
          }, 2500);
    }

    const redireccionarUsuario = redirect => {
        if(redirect){
            return <Redirect to="/producto"/>
        }
    }

    const mostrarFunciona = () => {
        
        return(
        <div className="alert alert-info" 

        style={{display: mensaje ? '':'none'}}>
            <h4>{`${producto.sNombre} se ha añadido al Carrito de Compra`}</h4>
        </div>
        );

        
        
    };

    // metodo cargar producto del url 
    const cargarDetalleProducto = productoId => {
        // funcion ubicado en apiProducto 
        getObjeto('Articulo',`/${productoId}`).then(
            (data={error:{message:'hay un problema, intente más tarde'}}) =>{            

            if ('error' in data) {

                setError(data.error.message);
            }  
            else {
                
                setProducto(data);
            }
            
        })
    }

    //cargar todo apenas entre a la pagina y cada vez que se cambie el state
    useEffect(() => {
        //guardar el id de la producto del url
        const productoId = props.match.params.productoId;
        cargarDetalleProducto(productoId);
    }, []);

    const botones = () =>{
        return(
            
            <div className="row">   

            {/* botones admin  */}
             <div className="btnAdminReceta">
             {isAutentificacion() 
             && isAutentificacion().cliente.bAdmin && (
                 <Fragment>
                     
                     {/* // aqui se pasa el id de la receta en el url para actualizar */}
                     <Link to={`/Articulo/${producto._id}/?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22_id%22%3A%20true%2C%0A%20%20%20%20%22sNombre%22%3A%20true%2C%0A%20%20%20%20%22aEtiqueta%22%3A%20true%2C%0A%20%20%20%20%22dFechaPublicacion%22%3A%20true%2C%0A%20%20%20%20%22sTexto%22%3A%20true%2C%0A%20%20%20%20%22iPrecio%22%3A%20true%2C%0A%20%20%20%20%22sUrlVideo%22%3A%20true%2C%0A%20%20%20%20%22sUrlImagen%22%3A%20true%2C%0A%20%20%20%20%22bActivo%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22string%22%0A%20%20%5D%0A%7D`}>
                         <button className="btn btn-outline-primary borderRadio0 border-right-0">
                                 Modificar Receta
                         </button>
                     </Link>
 
                     <Link to={`../Eliminar/${producto._id}`}>
                         <button className="btn btn-outline-primary borderRadio0 border-right-0">
                                 Eliminar Receta
                         </button>  

                     </Link>
 
                 </Fragment>
             )}
                 {/* btn regresar a receta general  */}
                 <Link to={`/Producto`}>
                         <button className="btn btn-outline-primary borderRadio0">
                                 Atras
                         </button>
                     
                 </Link>
              </div>
              
              </div>
        );
    } 

    return(
        
        <div className="mt10 mx-5 container-fluid ">
            <div className="msgStatic">{mostrarFunciona()}</div>
            {redireccionarUsuario(redirect)}
            <Menu />
            <div className="row mb-5">
                <div className="col-lg-6 col-md-12 recetaDetalleTitulo">
                    <h1 className="text-capitalize">{producto.sNombre}</h1>
                </div>
                <div className="col-lg-6 col-md-12 recetaDetalleBtn">
                    {botones()} 
                </div>
            </div>

           
            {/* contenido  */}
            <div className="row mt-1 Content">
                <div className="col-lg-6 col-md-11 fix">     
                    <img className="video" src={producto.sUrlImagen} />
                </div>  
                <div className="col-lg-5 col-md-11 scroll mr-1">   
                    <h1 className=" text-left colorPink">Descripcion</h1>  
                    <h5 className="mt-4 mb-4 text-justify">{producto.sDescripcion}</h5>
                    <h3 className="float-right">Precio: $ {producto.iPrecio}</h3>

                    {!isAutentificacion() &&(
                            <Link to={`/signIn`}>
                                <button className="btn btn-outline-primary">Añadir a Carrito de Compra</button>
                            </Link>
                    )}

                    {isAutentificacion() &&(
                        <button onClick={agregarCarrito} className="btn btn-outline-primary">Añadir a Carrito de Compra</button>
                    )}

                </div>             
            </div>
        </div>
    );
}

export default ProductoDetalle;   
