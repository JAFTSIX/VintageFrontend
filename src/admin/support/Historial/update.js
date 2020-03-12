import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import {getObjetonyId,modificarObjeto } from '../../apiAdmin';
import {Redirect} from 'react-router-dom';
import '../../../index.css'



const ModificarHistorial = (props) => {
    const [valor, setValor] = useState({
        _id: "",
        sNombre : "",
        HistorialModificado:"",
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
        HistorialModificado,
        redirect,
        formData
       
    } = valor;

  
   
    const cargarHistorial = _Id => {

        getObjetonyId('Historial',_Id)
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
        cargarHistorial(_Id)
        
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
        modificarObjeto ('Historial',{_id,sNombre})
        .then(data=>{
           

                setValor({
                    HistorialModificado: true,
                    redirect:true
                })       
        })
        
    }

    const agregarHistorialForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            
            <div className="form-group">
                <label className="text-muted">Nombre </label>
                <input onChange={handleChange('sNombre')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={sNombre} />
            </div>

         


            <button className="btn btn-outline-primary">
                Modificar Historial
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
        style={{display: HistorialModificado ? '':'none'}}>
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
            return <Redirect to="/Historial/Support/"></Redirect>
        }
            
    }
    

    return (
        <Layout titulo="MODIFICAR Historial" 
        descripcion="" 
        className="container-fluid">
 
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">                
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarHistorialForm()}
                    {redireccionarUsuario()}
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default ModificarHistorial;