import React, { Fragment,useState }from 'react';
import { Link, Redirect } from 'react-router-dom';
import MostrarImagen from './MostrarImagen';
import {isAutentificacion} from '../autentificacion/index';
import '../index.css';
import './producto.css';
import {agregarProductoCarrito} from './CarritoCompra/carritoHelper'


const ProductoInterfaz = ({producto}) => {

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
        <div className="alert alert-success" 

        style={{display: mensaje ? '':'none'}}>
            <h4>{`${producto.sNombre} se ha añadido al Carrito de Compra`}</h4>
        </div>
        );  
    };

    // const desaparecerMensaje = () => {
    //    let msgStatic = document.querySelector(".msgStatic");
    //    if(msgStatic.style.opacity === 1){
    //     msgStatic.style.opacity = 0;
    //    }else{
    //     msgStatic.style.opacity = 0;
    //    }
    // }

    return(
        
        <div className="col-lg-6 col-md-12 mb-3 ">
            
            {/* msg se anade correctamente a carrito  */}
            <div className="msgStatic">{mostrarFunciona()}</div>
            {/* {desaparecerMensaje()} */}
            <div className="card">
                <div className="card-body">
                    {/* llamar a la funcion para redireccionar al usuario  */}
                    
                    {redireccionarUsuario(redirect)}
                <div className="card-overlay maxheigh"></div>
                    {/* imagen  */}                   
                    <MostrarImagen item={producto}
                    url="Articulo"/>

                    {/* <p><b>Descripcion:</b>  {producto.sDescripcion}</p>
                    <p><b>Precio:</b>  {producto.iPrecio}</p> */}
                    
                    {/* hover  */}
                    <div className="btnProductos fadeIn-top"> 
                    {/* titulo  */}
                        <h1 className="text-capitalize font-weight-bold text-center text-light">{producto.sNombre}</h1> 
                        <h3 className="text-light">Precio: ${producto.iPrecio}</h3>

                        {/* Botones  */}
                        <Link to={`/Articulo/Detalle/${producto._id}`}>
                            <button className="btn customBtn btnPink  
                            mt-2 mb-2 agregarPadding mr-2">
                                <img src="https://img.pngio.com/white-eye-3-icon-free-white-eye-icons-eye-png-white-256_256.png" height="50px" width="50px"/>
                                {/* Ver Producto */}
                            </button>
                        </Link>

                        {/* si el usuario esta log in  */}
                        {isAutentificacion() && (
                            <Fragment>
                            {/* llamar otra funcion para llamar al carritoHelper y no llamar directamente  */}
                                <button onClick={agregarCarrito} className="btn customBtn mt-2 btnPink
                                mb-2 agregarPadding">
                                    <img src="https://papyrusltda.com/wp-content/uploads/2019/05/19.-Carrito-de-compras.png" height="50px" width="70px"/>
                                        {/* Añadir a Carrito de Compra */}
                                </button>

                                <br />
                            </Fragment>

                        )}

                        {/* si no esta log in el usuario  */}
                        {!isAutentificacion() && (
                            <Link to={`/SignIn`}>
                                <button className="btn customBtn btnPink btnPink
                                mt-2 mb-2 agregarPadding mr-2">
                                    <img src="https://papyrusltda.com/wp-content/uploads/2019/05/19.-Carrito-de-compras.png" height="50px" width="70px"/>
                                    {/* Añadir a Carrito de Compra */}
                                </button>
                            </Link>
                        )}

                        

                        {isAutentificacion() 
                        && isAutentificacion().cliente.bAdmin && (
                        <Fragment>
                        {/* // aqui se pasa el id del producto en el url para actualizar */}
                        <Link to={`/Articulo/${producto._id}/?filter[offset]=0&filter[limit]=100&filter[skip]=0`}>
                            <button className="btn customBtn btnPinkFuerte text-light btnPink
                            mt-2 mb-2 agregarPadding mr-2">
                                Modificar Producto
                            </button>
                        </Link>

                        <Link to={`Articulo/Eliminar/${producto._id}`}>
                            <button className="btn customBtn btnPinkFuerte text-light btnPink
                            mt-2 mb-2 agregarPadding mr-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Producto
                            </button>
                        </Link>
                        </Fragment>
                    )}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductoInterfaz;