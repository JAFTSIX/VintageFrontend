import React, {useState, useEffect, Fragment} from 'react';
import {leerRecetaDetalle} from './apiReceta';
import '../index.css';
import '../css.css';
import './videoReceta.css';
import {isAutentificacion} from '../autentificacion/index';
import { Link } from 'react-router-dom';
import Menu from '../nucleo/Menu';


const RecetaDetalle = (props) => {
    const [receta, setReceta] = useState({});
    const [error, setError] = useState(false);

    // metodo cargar receta del url 
    const cargarDetalleReceta = recetaId => {
        // funcion ubicado en apiReceta 
        leerRecetaDetalle(recetaId).then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setReceta(data);
            }
        })
    }

    //cargar todo apenas entre a la pagina y cada vez que se cambie el state
    useEffect(() => {
        //guardar el id de la receta del url
        const recetaId = props.match.params.recetaId;
        cargarDetalleReceta(recetaId);
    }, []);

    return(
        
        <div className="mt10 mx-5 container-fluid ">
            <Menu />
            <h1 className="text-capitalize">{receta.sNombre}</h1>
            <h4 className="mb-5">Detalle de Receta</h4>
            {/* imagen prodcuto  */} 
            <div className="row">   
                <img src={receta.sUrlImagen} height="110px" width="110px" className="imagenReceta"></img>
            </div>

            {/* botones admin  */}
            <div className="btnAdmin">
            {isAutentificacion() 
            && isAutentificacion().cliente.bAdmin && (
                <Fragment>
                    
                    {/* // aqui se pasa el id del producto en el url para actualizar */}
                    <Link to={`/Receta/${receta._id}/?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22_id%22%3A%20true%2C%0A%20%20%20%20%22sNombre%22%3A%20true%2C%0A%20%20%20%20%22aEtiqueta%22%3A%20true%2C%0A%20%20%20%20%22dFechaPublicacion%22%3A%20true%2C%0A%20%20%20%20%22sTexto%22%3A%20true%2C%0A%20%20%20%20%22iPrecio%22%3A%20true%2C%0A%20%20%20%20%22sUrlVideo%22%3A%20true%2C%0A%20%20%20%20%22sUrlImagen%22%3A%20true%2C%0A%20%20%20%20%22bActivo%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22string%22%0A%20%20%5D%0A%7D`}>
                        <button className="btn btn-outline-primary 
                            agregarPadding mr-2">
                                Modificar Receta
                        </button>
                    </Link>

                    <Link to={`Eliminar/Receta/${receta._id}`}>
                        <button className="btn btn-outline-primary
                            agregarPadding ml-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Receta
                        </button>
                    
                    </Link>

                </Fragment>
            )}
                {/* btn regresar a receta general  */}
                <Link to={`/Receta`}>
                        <button className="btn btn-outline-primary
                            agregarPadding ml-3" data-toggle="modal" data-target="#exampleModal">
                                Atras
                        </button>
                    
                </Link>
             </div>

            {/* contenido  */}
            <div className="row mt-1 Content">
                <div className="col-6 fix">     
                    <iframe className="video" src={receta.sUrlVideo} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>  
                <div className="col-5 scroll mr-1">     

                {/* si el precio es 0  */}
                {receta.iPrecio === 0 &&    
                    <Fragment className="">
                    <h1 className="text-capitalize colorPink">Instrucciones</h1>
                    <h5 className="mt-4 text-justify">{receta.sTexto}</h5>
                    </Fragment>
                }
                    

                {/* se va a mostrar precio unicamente si es mayor a 0  */}
                {receta.iPrecio > 0 &&
                        <Fragment className="">
                            <h1 className=" text-left colorPink">Precio: ₡ {receta.iPrecio}</h1>
                            <h5 className="mt-4 text-justify">Receta Premium, Por favor comprar para ver la receta completa</h5>
                            <button className="btn btn-outline-primary">Añadir a Carrito de Compra</button>
                        </Fragment>
                 }   

                </div>  

            
            </div>
        </div>
    );
}

export default RecetaDetalle;   
