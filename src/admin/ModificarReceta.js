import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import { isAutentificacion } from '../autentificacion';
import {getReceta} from './apiAdmin';
import { modificarReceta } from './apiAdmin';
import {Redirect} from 'react-router-dom';
import '../index.css'



const ModificarReceta = (props) => {
    const [valor, setValor] = useState({
        _id: "",
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
        recetaModificado:"",
        redirect:false,
        loading: false,
        error : "",
        formData:""
    });

    


    const {token} = isAutentificacion();
    

    //destruture
    const {
        _id,
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
        recetaModificado,
        redirect,
        formData
       
    } = valor;

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    

    //cargar receta
    const cargarReceta = recetaId => {

        getReceta(recetaId)
        .then(data=>{
        if (data===undefined) {
            setValor({...valor, error:'Problemas, intente más tarde'})
        } else {
            if('error' in data){
                setValor({...valor, error:data.error.message})
            }else{
                setValor({
                    ...valor,
                    _id: data._id, 
                    sNombre: data.sNombre,
                    aEtiqueta: data.aEtiqueta,
                    sTexto: data.sTexto,
                    iPrecio2: data.iPrecio,
                    sUrlVideo: data.sUrlVideo,
                    sUrlImagen: data.sUrlImagen,
                    bActivo: data.bActivo,
                    loading: false,
                })
            }
        }

            
        })
    }

    useEffect(()=>{
        const recetaId = props.match.params.recetaId
        console.log(recetaId)
        cargarReceta(recetaId)
        
    }, []);
    
    


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
        modificarReceta(token, {_id,sNombre,aEtiqueta,sTexto,
            iPrecio,sUrlVideo,sUrlImagen,bActivo,dFechaPublicacion})
        .then(data=>{
            // if(data.error){
            //     setValor({...valor, error:data.error});
            // }
                setValor({
                    recetaModificado: true,
                    redirect:true
                })       
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
                Modificar Receta
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
        style={{display: recetaModificado ? '':'none'}}>
            <h4>{`${sNombre} se ha modificado exitosamente `}</h4>
        </div>
    );
    const mostrarLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Cargando...</h2>
        </div>)
    );

    const redireccionarUsuario = () => {
        if(redirect){
            return <Redirect to="/receta"></Redirect>
        }
            
    }
    

    return (
        <Layout titulo="MODIFICAR RECETA" 
        descripcion="" 
        className="container-fluid">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">                
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarRecetaForm()}
                    {redireccionarUsuario()}
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default ModificarReceta;