import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import { isAutentificacion } from '../autentificacion';
import {getProducto} from './apiAdmin';
import { modificarProducto } from './apiAdmin';
import {Redirect} from 'react-router-dom';



const ModificarProducto = (props) => {
    const [valor, setValor] = useState({
        _id: "",
        sNombre: "",
        iCant2: 0,
        iPrecio2: 0,
        sDescripcion: "",
        bActivo: true,
        categorias: ["Mesa", "Vaso", "Olla"], //por ahora se va a poner manualmente
        sCategoria: "",
        foto: "",
        loading: false,
        error : "",
        productoCreado:"",
        redirect:false,
        formData:""
    });

    


    const {token} = isAutentificacion();
    

    //destruture
    const {
        _id,
        sNombre,
        iCant2,
        iPrecio2,
        sDescripcion,
        bActivo,
        categorias,
        sCategoria,
        foto,
        loading,
        error,
        productoModificado, //verificar si el producto fue creado o no
        redirect,
       
    } = valor;

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    

    //cargar productos
    const cargarProductos = productId => {

        getProducto(productId)
        .then(data=>{
            if(data.error){
                setValor({...valor, error:data.error})
            }else{
                setValor({
                    ...valor,
                    _id: data._id, 
                    sNombre: data.sNombre,
                    iCant2: data.iCant,
                    iPrecio2: data.iPrecio,
                    sDescripcion: data.sDescripcion,
                    bActivo: data.bActivo,
                    foto: "1",
                    loading: false,
                })
            }
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId
        console.log(productId)
        cargarProductos(productId)
        
    }, []);
    
    


    //funcion esta retornando otra funcion
    //el sNombre se va a ir cambiando, primero va ser foto, despues nombre, ...
    const handleChange = sNombre => event => {
        //entonces cuando se agrega, se va a guardar todo en formData
        //formData.set(sNombre, valor);
        setValor({...valor, [sNombre]:  event.target.value});
    }

    const clickSubmit =(event)=>{
        const iCant = parseInt(iCant2);
        const iPrecio = parseInt(iPrecio2);
        event.preventDefault();
        setValor({...valor, error:'', loading:true});
        modificarProducto(token, {_id,sNombre,iCant,iPrecio,
            sDescripcion,bActivo})
        .then(data=>{
            // if(data.error){
            //     setValor({...valor, error:data.error});
            // }
                setValor({
                    productoModificado: true,
                    redirect:true
                })       
        })
        
    }

    const agregarProductoForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Ingresar link de la imagen: </label>
                <input onChange={handleChange('foto')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={foto} />
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
                <label className="text-muted">Categoria </label>
                <select onChange={handleChange('sCategoria')} 
                        className="form-control">
                            <option>Selecciona una categoria</option>
                            {categorias && 
                            categorias.map((categoria, index) => (
                                <option key={index} value={index}>{categoria}</option>
                            ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Cantidad </label>
                <input onChange={handleChange('iCant2')} 
                        type="number" 
                        className="form-control" 
                        required
                        value={iCant2} />
            </div>

            <button className="btn btn-outline-primary">
                Agregar Producto
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
        style={{display: productoModificado ? '':'none'}}>
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
            return <Redirect to="/Producto"></Redirect>
        }
            
    }
    

    return (
        <Layout titulo="MODIFICAR PRODUCTO" 
        descripcion="" 
        className="container-fluid">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">                
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarProductoForm()}
                    {redireccionarUsuario()}
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default ModificarProducto;