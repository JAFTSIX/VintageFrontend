import React, {useState, useEffect, Fragment} from 'react';
import Layout from '../nucleo/Layout';
import {leerProductoDetalle} from './apiReceta';
import RecetaInterfaz from './RecetaInterfaz';
import '../index.css';
import '../css.css';
import './videoReceta.css';


const RecetaDetalle = (props) => {
    const [receta, setReceta] = useState({});
    const [error, setError] = useState(false);

    // metodo cargar receta del url 
    const cargarDetalleReceta = recetaId => {
        // funcion ubicado en apiReceta 
        leerProductoDetalle(recetaId).then(data=>{
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
        <div className="mt-5 pt-5">
        <Layout
            titulo={receta.sNombre}
            descripcion="Detalle de Recetas"        
            className="container-fluid "
        >
            {/* imagen  */} 
            <div className="row">
                <img src={receta.sUrlImagen} height="110px" width="110px" className="imagenReceta"></img>
            </div>

            {/* contenido  */}
            <div className="row mt-1 d-flex justify-content-center Content">
                <div className="col-5 fix">     
                    <iframe className="video" src={receta.sUrlVideo} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>  
                <div className="col-5 scroll">     

                {/* si el precio es 0  */}
                {receta.iPrecio === 0 && 
                    <Fragment>
                    <h1 className="text-capitalize colorPink">Instrucciones</h1>
                    <h5 className="mt-4 text-justify">{receta.sTexto}</h5>
                    </Fragment>
                }
                    

                    {/* se va a mostrar precio unicamente si es mayor a 0  */}
                    {receta.iPrecio > 0 &&
                        <Fragment>
                            <h1 className=" text-left colorPink">Precio: ₡ {receta.iPrecio}</h1>
                            <h5 className="mt-4 text-justify">Receta Premium, Por favor comprar para ver la receta completa</h5>
                            <button className="btn btn-outline-primary">Añadir a Carrito de Compra</button>
                        </Fragment>
                    }   

                </div>  

            
            </div>


            
        </Layout>
        </div>
    );
}

export default RecetaDetalle;   
