import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import {leerProductoDetalle} from './apiReceta';
import RecetaInterfaz from './RecetaInterfaz';
import '../index.css';
import '../css.css';


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
        <Layout jumbotron="jumboDetalleReceta"
            image={receta.sUrlImagen}
            titulo={receta.sNombre}
            descripcion="Detalle de Recetas"        
            className="container-fluid mx-2"
        >
            <div className="row mt-5">
            <div className="col-12">     
                <iframe width="560" height="315" src={receta.sUrlVideo} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            </div>
            
        </Layout>
    );
}

export default RecetaDetalle;