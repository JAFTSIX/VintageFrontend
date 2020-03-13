import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import {getObjetonyId,modificarObjeto,errorTranslator } from '../../apiAdmin';
import {Redirect} from 'react-router-dom';
import '../../../index.css'



const ModificarFactura = (props) => {
    const [valor, setValor] = useState({
        _id: "",
        sNombre : "",
        FacturaModificado:"",
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
        FacturaModificado,
        redirect,
        formData
       
    } = valor;

  
   
    const cargarFactura = _Id => {

        getObjetonyId('Factura',_Id)
        .then(data=>{

            if (data === undefined) {
                setValor({
                  ...valor,
                  error:'Problemas, intente más tarde'
                });
              } else{
                if('error' in data){
                    setValor({...valor, error:errorTranslator(data.error.message)})
                }else{
                    setValor({
                        ...valor,
                        _id: data._id, 
                        sNombre: data.sNombre,
                        loading: false,
                    })
                }
              }

            


        })
    }

    useEffect(()=>{
        const _Id = props.match.params._Id
        console.log(_Id)
        cargarFactura(_Id)
        
    }, []);
    
    


 
    const handleChange = name => event => {
        
        setValor({...valor, [name]:  event.target.value});
    }

    const clickSubmit =(event)=>{
    

        event.preventDefault();
        
        setValor({...valor, error:'', loading:true});
        modificarObjeto ('Factura',{_id,sNombre})
        .then(data=>{
            if (data === undefined) {
                setValor({
                  ...valor,
                  error:'Problemas, intente más tarde'
                });
              } else{
                  
                setValor({
                    FacturaModificado: true,
                    redirect:true
                })   
              }
    
        })

        
    }

    const agregarFacturaForm = () => (
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
                Modificar Factura
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
        style={{display: FacturaModificado ? '':'none'}}>
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
            return <Redirect to="/Factura/Support/"></Redirect>
        }
            
    }
    

    return (
        <Layout titulo="MODIFICAR Factura" 
        descripcion="" 
        className="container-fluid">
 
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">                
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarFacturaForm()}
                    {redireccionarUsuario()}
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default ModificarFactura;