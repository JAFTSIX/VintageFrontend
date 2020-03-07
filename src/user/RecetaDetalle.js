import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import {getReceta} from './apiReceta';
import RecetaInterfaz from './RecetaInterfaz';
import '../index.css'

const RecetaDetalle = (props) => {
    const [receta, setReceta] = useState({});
    const [error, setError] = useState(false);

    const cargarDetalleReceta = recetaId => {

    }

    //cargar todo apenas entre a la pagina y cada vez que se cambie el state
    useEffect(() => {
        //guardar el id de la receta del url
        const recetaId = props.match.params.recetaId
    }, []);

    return(
        <Layout 
            titulo="Detalle Receta"
            className="container-fluid"
        >
            <p>detalle receta</p>
            
        </Layout>
    );
}

export default RecetaDetalle;