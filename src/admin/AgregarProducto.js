import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import { isAutentificacion } from '../autentificacion';
import { Link } from 'react-router-dom';
import { crearProducto } from './apiAdmin';
import AgregarCategoria  from './support/Categorias/insert';
import '../index.css';
import '../css.css';

const AgregarProducto = () => {
    const [valor, setValor] = useState({
        sNombre: "",
        iCant2: 0,
        iPrecio2: 0,
        sDescripcion: "",
        bActivo: true,
        categorias: ["Mesa", "Vaso", "Olla"], //por ahora se va a poner manualmente
        sCategoria: "",
        sUrlImagen: "",
        loading: false,
        error : "",
        productoCreado:"",
        redirect:false,
        formData:""
    });


    const {_id, token} = isAutentificacion();
    const {nombre} = AgregarCategoria();

    //destruture
    const {
        sNombre,
        iCant2,
        iPrecio2,
        sDescripcion,
        bActivo,
        categorias,
        sCategoria,
        sUrlImagen,
        loading,
        error,
        productoCreado, //verificar si el producto fue creado o no
        redirect,
       
    } = valor;



    // Cargar las categorias
    const cargarCategoria = () => {

    }

    //funcion esta retornando otra funcion
    //el sNombre se va a ir cambiando, primero va ser foto, despues nombre, ...
    const handleChange = sNombre => event => {
        //entonces cuando se agrega, se va a guardar todo en formData
        //formData.set(sNombre, valor);
        setValor({...valor, [sNombre]:  event.target.value});
        console.log(nombre);
    }

    const clickSubmit =(event)=>{
        const iCant = parseInt(iCant2);
        const iPrecio = parseInt(iPrecio2);
        event.preventDefault();
        setValor({...valor, error:'', loading:true});
        crearProducto(token, {sNombre,iCant,iPrecio,
            sDescripcion,sUrlImagen,bActivo})
        .then(data=>{
            if(data.error){
                setValor({...valor, error:data.error});
            }else{
                setValor({
                    ...valor, 
                    sNombre: "",
                    iCant: 0,
                    iPrecio: 0,
                    sDescripcion: "",
                    bActivo: true,
                    sUrlImagen: "",
                    loading: false,
                    productoCreado: data.sNombre,
                })
            }
        })
        
    }

    const agregarProductoForm = () => (
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
                <label className="text-muted">Nombre </label>
                <input onChange={handleChange('sNombre')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={sNombre} />
            </div>

            <div className="form-group">
                <label className="text-muted">Descripcion </label>
                <textarea onChange={handleChange('sDescripcion')} 
                        className="form-control" 
                        required
                        value={sDescripcion} />
            </div>

            <div className="form-group">
                <label className="text-muted">Precio </label>
                <input onChange={handleChange('iPrecio2')} 
                        type="number" 
                        className="form-control" 
                        required
                        value={iPrecio2} />
            </div>

            <div className="form-group">    
                <label className="text-muted">Cantidad </label>
                <input onChange={handleChange('iCant2')} 
                        type="number" 
                        className="form-control" 
                        required
                        value={iCant2} />   
            </div>
                                
            <div className="row">   
                <div className="col-12">
                    <button className="btn btn-outline-primary"> 
                        Agregar Producto
                    </button>
                </div>
            </div>
            
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
        style={{display: productoCreado ? '':'none'}}>
            <h4>{`${productoCreado} se ha creado exitosamente `}</h4>
        </div>
    );
    const mostrarLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Cargando...</h2>
        </div>)
    );
    

    return (
        <Layout jumbotron="jumboEstatico" 
        image="https://besthqwallpapers.com/Uploads/3-1-2020/118025/strawberry-margarita-cocktail-macro-cocktails-glass-with-drink-margarita-cocktail.jpg"
        titulo="Agregar Producto" 
        descripcion="" 
        className="container-fluid">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarProductoForm()}
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default AgregarProducto;