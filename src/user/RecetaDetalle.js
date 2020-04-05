import React, {useState, useEffect, Fragment} from 'react';

import {getObjeto,errorTranslator} from './../admin/apiAdmin';
import '../index.css';
import '../css.css';
import './videoReceta.css';
import {isAutentificacion} from '../autentificacion/index';
import { Link, Redirect } from 'react-router-dom';
import Menu from '../nucleo/Menu';
import {agregarProductoCarrito} from './CarritoCompra/carritoHelper'


const RecetaDetalle = (props) => {
    const [receta, setReceta] = useState({});
    const [error, setError] = useState(false);
    const [ver, setVer] = useState(false);
    
    
    //metodos para anadir a carrito de compra
    const [redirect, setRedirect] = useState(false);
    const [mensaje, setMensaje] = useState(false);
    
    
    
    
    // metodo cargar receta del url 
    const cargarDetalleReceta = recetaId => {
        // funcion ubicado en apiReceta 
        getObjeto('Receta','/'+recetaId ).then((data={error:{message:'hay un problema, intente más tarde'}})=>{

            
            if ('error' in data) {            
                //Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.
                setError(errorTranslator( data.error.message));
            } else {
                console.log('Receta/'+recetaId )
                console.log('sd',data)
                
                setReceta(data);
                
            }
            

        })
    }















    const isVer = (recetaId,ruta) => {
        // funcion ubicado en apiReceta 
        ///Cliente/Ver/{id}
        getObjeto('Cliente',`/${ruta}/${recetaId}` ).then( (data={error:{message:'hay un problema, intente más tarde'}})=>{

            
            if ('error' in data) {            
                //Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.
                setError(errorTranslator( data.error.message));
            } else {
             console.log('ver',data.value)
                setVer(data.value);
                
            }
            

        })
    }




 

    //cargar todo apenas entre a la pagina y cada vez que se cambie el state
    useEffect(() => {
        //guardar el id de la receta del url
        const recetaId = props.match.params.recetaId;
        cargarDetalleReceta(recetaId);
 
        if (isAutentificacion()) {
            isVer(recetaId,'VerS');    
        } else {
            isVer(recetaId,'VerU');    
        }
         
    }, []);

    










    const agregarCarrito = () => {
        // parametros -> la receta que viene del prop y el cb function 
        agregarProductoCarrito(receta,1, ()=>{
            setMensaje(true);
        });

        // que desaparezca en 2 seg     
        setTimeout(() => {
            setMensaje(false);
          }, 2500);
    }








    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );
        





    const mostrarFunciona = () => {       
        return(
        <div className="alert alert-info" 

        style={{display: mensaje ? '':'none'}}>
            <h4>{`${receta.sNombre} se ha añadido al Carrito de Compra`}</h4>
        </div>
        );  
    };

   

    const mostrar  = () => {       
       console.log( ver) 
    };




    const botones = () =>{
        return(
            
            <div className="row">   

            {/* botones admin  */}
             <div className="btnAdminReceta">
             {isAutentificacion() 
             && isAutentificacion().cliente.bAdmin && (
                 <Fragment>
                     
                     {/* // aqui se pasa el id de la receta en el url para actualizar */}
                     <Link to={`/Receta/${receta._id}/?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22_id%22%3A%20true%2C%0A%20%20%20%20%22sNombre%22%3A%20true%2C%0A%20%20%20%20%22aEtiqueta%22%3A%20true%2C%0A%20%20%20%20%22dFechaPublicacion%22%3A%20true%2C%0A%20%20%20%20%22sTexto%22%3A%20true%2C%0A%20%20%20%20%22iPrecio%22%3A%20true%2C%0A%20%20%20%20%22sUrlVideo%22%3A%20true%2C%0A%20%20%20%20%22sUrlImagen%22%3A%20true%2C%0A%20%20%20%20%22bActivo%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22string%22%0A%20%20%5D%0A%7D`}>
                         <button className="btn btn-outline-primary borderRadio0 border-right-0">
                                 Modificar Receta
                         </button>
                     </Link>
 
                     <Link to={`../Eliminar/${receta._id}`}>
                         <button className="btn btn-outline-primary borderRadio0 border-right-0">
                                 Eliminar Receta
                         </button>  

                     </Link>
 
                 </Fragment>
             )}
                 {/* btn regresar a receta general  */}
                 <Link to={`/Receta`}>
                         <button className="btn btn-outline-primary borderRadio0">
                                 Atras
                         </button>
                     
                 </Link>
              </div>
              
              </div>
        );
    }








    return(
        
        <div className="mt10 mx-5 container-fluid   Content">
            <div className="msgStatic"></div>
            <Menu />
            <div className="row">

            {mostrarError ()}{mostrarFunciona()}
            
       
                <div className="col-lg-6 col-md-12 recetaDetalleTitulo">
                    <h1 className="text-capitalize mb-5 mr-5">{receta.sNombre}</h1>
                    {/* imagen prodcuto  */} 
                    <img src={receta.sUrlImagen} height="70px" width="110px" className="imagenReceta"></img>
                </div>
                <div className="col-lg-6 col-md-12 recetaDetalleBtn">
                    {botones()} 
                </div>
            </div>

            {/* contenido  */}
            <div className="row mt-1 Content">
            {ver && 
                <div className="col-lg-6 col-md-11 fix">     
                
                    <iframe className="video" src={receta.sUrlVideo} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>  

            }

            {!ver&&(
                <div className="col-lg-6 col-md-11 fix">     
                   
                    <iframe className="video" src={receta.sUrlVideoTrailer} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>  )

            }
                 <div className="col-lg-5 col-md-11 scroll mr-1">     
            
            

                {/* si el precio es 0  */}
                {ver &&    
                    <div>

                    
                    
                    <Fragment className="">
                    <h1 className="text-capitalize colorPink">Instrucciones</h1>
                    <h5 className="mt-4 text-justify textAreaSaltoLinea">{receta.sTexto}</h5>
                    </Fragment>
                    </div>

                    
                    

                }   
                 

                {/* se va a mostrar precio unicamente si es mayor a 0  */}
                {receta.iPrecio > 0&&!ver &&
                        <Fragment className="">
                            <h1 className=" text-left colorPink">Precio: $ {receta.iPrecio}</h1>
                            <h5 className="mt-4 text-justify">Receta Premium, Por favor comprar para ver la receta completa</h5>
                            
                            {!isAutentificacion() &&(
                                <Link to={`/signIn`}>
                                <button className="btn btn-outline-primary">Añadir a Carrito de Compra</button>
                                </Link>
                            )}

                            {isAutentificacion() &&(
                                <button onClick={agregarCarrito} className="btn btn-outline-primary">Añadir a Carrito de Compra</button>
                            )}
                            

                            
                        </Fragment>
                 }   





                  


                </div>  

            
            </div>
        </div>
    );
}

export default RecetaDetalle;   
