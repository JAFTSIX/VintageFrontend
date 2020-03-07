import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import { isAutentificacion } from '../autentificacion';
import { Link } from 'react-router-dom';
import { crearReceta } from './apiAdmin';
import '../index.css'

const AgregarReceta = () => {
    const [valor, setValor] = useState({
        sNombre : "",
        aEtiqueta: [
            "Desayuno",
            "Almuerzo",
            "Cena"
        ],
        dFechaPublicacion: "2020-02-17T01:50:48.564Z",
        sTexto : "",
        iPrecio2: 0,
        sUrlVideo: "",
        sUrlImagen: "",
        bActivo: true,
        loading: false,
        error : "",
        recetaCreado:"",
        redirect:false,
        formData:""
    });


    const {_id, token} = isAutentificacion();

    //destruture
    const {
        sNombre,
        aEtiqueta,
        dFechaPublicacion,
        sTexto,
        iPrecio2,
        sUrlVideo,
        sUrlImagen,
        bActivo,
        loading,
        error,
        recetaCreado,
        redirect,
        formData
       
    } = valor;



    //funcion esta retornando otra funcion
    //el sNombre se va a ir cambiando, primero va ser foto, despues nombre, ...
    const handleChange = sNombre => event => {
        //entonces cuando se agrega, se va a guardar todo en formData
        //formData.set(sNombre, valor);
        setValor({...valor, [sNombre]:  event.target.value});
    }

    const clickSubmit =(event)=>{
        const iPrecio = parseInt(iPrecio2);
        event.preventDefault();
        setValor({...valor, error:'', loading:true});
        crearReceta(token, {sNombre,aEtiqueta,dFechaPublicacion,
            sTexto,iPrecio,sUrlVideo,sUrlImagen,bActivo})
        .then(data=>{
            if(data.error){
                setValor({...valor, error:data.error});
            }else{
                setValor({
                    ...valor, 
                    sNombre: "",
                    sTexto: "",
                    iPrecio: 0,
                    bActivo: true,
                    sUrlVideo: "",
                    sUrlImagen: "",
                    loading: false,
                    recetaCreado: data.sNombre,
                })
            }
        })
        
    }

    const agregarRecetaForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Ingresar link de la imagen: </label>
                <input onChange={handleChange('sUrlImagen')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={sUrlImagen} />
            </div>
            <div className="form-group">
                <label className="text-muted">Ingresar link de la receta: </label>
                <input onChange={handleChange('sUrlVideo')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={sUrlVideo} />
            </div>

            <div className="form-group">
                <label className="text-muted">Nombre </label>
                <input onChange={handleChange('sNombre')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={sNombre} />
            </div>

            <div className="form-group">
                <label className="text-muted">Categoria </label>
                <select onChange={handleChange('sCategoria')} 
                        className="form-control">
                            <option>Selecciona una categoria</option>
                            {aEtiqueta && 
                            aEtiqueta.map((categoria, index) => (
                                <option key={index} value={index}>{categoria}</option>
                            ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Descripcion </label>
                <textarea onChange={handleChange('sTexto')} 
                        className="form-control" 
                        required
                        value={sTexto} />
            </div>

            <div className="form-group">
                <label className="text-muted">Precio </label>
                <input onChange={handleChange('iPrecio2')} 
                        type="number" 
                        className="form-control" 
                        required
                        value={iPrecio2} />
            </div>


            <button className="btn btn-outline-primary">
                Agregar Receta
            </button>
        </form>
    );

    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '':'none'}}>
            {error}
        </div>
    );
    const mostrarFunciona = () => (
        <div className="alert alert-info" 
        style={{display: recetaCreado ? '':'none'}}>
            <h4>{`${recetaCreado} se ha creado exitosamente `}</h4>
        </div>
    );
    const mostrarLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Cargando...</h2>
        </div>)
    );
    

    return (
        <Layout titulo="Agregar Receta" 
        descripcion="" 
        className="container-fluid">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarRecetaForm()}
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default AgregarReceta;