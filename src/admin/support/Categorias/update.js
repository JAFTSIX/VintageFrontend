import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import {getObjetonyId,modificarObjeto ,errorTranslator} from '../../apiAdmin';
import {Redirect} from 'react-router-dom';
import '../../../index.css';
import { Link } from 'react-router-dom';



const ModificarCategoria = (props) => {
    const [valor, setValor] = useState({
        _id: "",
        sNombre : "",
        CategoriaModificado:"",
        redirect:false,
        loading: false,
        error : "",
        formData:""
    });

    
 
    

    //destruture
    const {
        _id,
        sNombre,
        loading,
        error,
        CategoriaModificado,
        redirect,
        formData
       
    } = valor;

  
   
    const cargarCategoria = _Id => {

        getObjetonyId('Categoria',_Id)
        .then(data=>{
            if(data.error){
                setValor({...valor, error:data.error})
            }else{
                setValor({
                    ...valor,
                    _id: data._id, 
                    sNombre: data.sNombre,
                    loading: false,
                })
            }
        })
    }

    useEffect(()=>{
        const _Id = props.match.params._Id
        console.log(_Id)
        cargarCategoria(_Id)
        
    }, []);
    
    


 
    const handleChange = name => event => {
        
        setValor({...valor, [name]:  event.target.value});
    }

    const clickSubmit =(event)=>{
        /*
          
        
        
        
        
        
        
        
        
        
        
        Aqui hay que preguntar y validar 
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          */  

        event.preventDefault();
        setValor({...valor, error:'', loading:true});
        modificarObjeto ('Categoria',{_id,sNombre})
        .then(data=>{
            if ('error' in data) {
                setValor({...valor, error:errorTranslator(data.error.message) });
                
            } else{
    
                setValor({
                    CategoriaModificado: true,
                    redirect:true
                })      
            }

                
        })
        
    }

    const agregarCategoriaForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <Link to={`/Categoria/Support/`}>
                <button className="btn btn-outline-primary mb-5">
                    Regresar a Categoria
                </button>
            </Link>
            <div className="form-group">
                <label className="text-muted">Nombre </label>
                <input onChange={handleChange('sNombre')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={sNombre} />
            </div>

         


            <button className="btn btn-outline-primary">
                Modificar Categoria
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
        style={{display: CategoriaModificado ? '':'none'}}>
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
            return <Redirect to="/categoria/Support/"></Redirect>
        }
            
    }
    

    return (
        <Layout 
        jumbotron="jumboEstatico" 
        image="https://blogthinkbig.com/wp-content/uploads/2019/07/dulce-comida.jpg"
        titulo="MODIFICAR Categoria" 
        descripcion="" 
        className="container-fluid">
 
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">                
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarCategoriaForm()}
                    {redireccionarUsuario()}
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default ModificarCategoria;