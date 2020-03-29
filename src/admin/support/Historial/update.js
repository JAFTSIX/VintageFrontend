import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import {getObjetonyId,modificarObjeto ,errorTranslator} from '../../apiAdmin';
import {Redirect} from 'react-router-dom';
import '../../../index.css'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { Checkbox } from 'react-input-checkbox';
import '../support.css';
import {checkingHistorial} from '../../../user/procesos/ValidarDatos';
const ModificarHistorial = (props) => {
    const [valor, setValor] = useState({
         
          
        dFecha: new Date(),
        bMinTest:false,
        iDuracion: 0,
         sCliente: '',
        sReceta: '',

        HistorialModificado:"",
        redirect:false,
        loading: false,
        error : "",
        formData:""
    });

    
 
    

    
    const {
     
        dFecha,
        bMinTest,
        iDuracion,
         sCliente,
        sReceta,

        loading,
        error,
        HistorialModificado,
        redirect,
        formData
       
    } = valor;

  
   
    const cargarHistorial = _Id => {

        getObjetonyId('Historial', _Id)
            .then(data => {

                if (data === undefined) {
                    setValor({
                        ...valor,
                        error: 'Problemas, intente mas tarde'
                    })
                } else {

                    if ('error' in data) {
                        setValor({
                            ...valor,
                            error: errorTranslator(data.error.message)
                        })
                    } else {

                        setValor({

                            ...valor,
                            ...data,
                            dFecha: moment(data.dFecha).toDate(),
                            loading: false,
                        })
                    }
                }
            })
        }

    useEffect(()=>{
        const _Id = props.match.params._Id
     
        cargarHistorial(_Id)
        
    }, []);
    
    


 
    const handleChange =nombre => event => {
     console.log(valor)
     console.log(nombre)
     if (nombre==='dFecha') {
        setValor({...valor, [nombre]: event});    
     } else if (nombre==='iDuracion'){
        setValor({...valor, [nombre]: parseInt(event.target.value)});    
     } else if (nombre=== 'bMinTesttrue'){
        setValor({...valor, bMinTest: false});    
     }else if (nombre=== 'bMinTestfalse'){
        setValor({...valor, bMinTest: true});    
     }else {
        setValor({...valor, [nombre]: event.target.value});    
     }


     console.log(valor)
    }

    
    const clickSubmit =(event)=>{
        event.preventDefault();
    const resultado=checkingHistorial({
        _id:props.match.params._Id    ,
        dFecha,
        bMinTest,
        iDuracion,
         sCliente,
        sReceta,
    })
     
    if (resultado.valido) {
        setValor({...valor, error:'', loading:true});
        modificarObjeto ('Historial',{
            _id:props.match.params._Id    ,
            dFecha,
            bMinTest,
            iDuracion,
             sCliente,
            sReceta,
        })
        .then(data=>{
           
            if('error' in data){
                setValor({...valor, error:errorTranslator(data.error.message)})
            }else{
                
                setValor({
                    HistorialModificado: true,
                    redirect:true
                })       
            }

                
        })
        
    } else {
        setValor({...valor, error:resultado.incidente})
        
        
    }
     
       
    }

    const agregarHistorialForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            
            <div className="form-group">
                <label className="text-muted mr-3">Fecha</label>
                
                <DateTimePicker
                        onChange={handleChange('dFecha')}
                        value={dFecha}
                        
                      />
            </div>

            <div className="form-group">
            <label className="text-muted mr-2">¿Permaneció más de 2 minutos? </label>
                      <Checkbox  onChange={handleChange('bMinTest'+bMinTest)}  value={bMinTest}> </Checkbox>

        </div>

        <div className="form-group">
                <label className="text-muted">Duración  </label>
                <input onChange={handleChange('iDuracion')} 
                        type="number" 
                        className="form-control" 
                        required
                        value={iDuracion } />
            </div>
            <div className="form-group">
                <label className="text-muted">Id Cliente</label>
                <input onChange={handleChange('sCliente')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={sCliente} />
            </div>
            <div className="form-group">
                <label className="text-muted">Id Receta </label>
                <input onChange={handleChange('sReceta')} 
                        type="text" 
                        className="form-control" 
                        required
                        value={ sReceta} />
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
            <h4>{`el registro se ha modificado exitosamente `}</h4>
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
        jumbotron="jumboEstatico" 
        image="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/s960x960/66526238_2990154991011461_3807067974771146752_o.jpg?_nc_cat=102&_nc_sid=2d5d41&_nc_ohc=1uSLthZzbM0AX9dBJ0L&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=7&oh=ab14ac3b85f9bea5b24009aed4feb93f&oe=5EA7C51D"
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