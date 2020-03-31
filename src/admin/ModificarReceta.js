import React, {useState, useEffect,useCallback} from 'react';
import Layout from '../nucleo/Layout';
import {getReceta} from './apiAdmin';
import { modificarReceta , getObjeto,errorTranslator,modificarObjeto} from './apiAdmin';
import {Redirect} from 'react-router-dom';
import '../index.css';
import '../css.css';
import {checkingReceta} from '../user/procesos/ValidarDatos';
import { Link } from 'react-router-dom';
import { Checkbox } from 'react-input-checkbox';

const ModificarReceta = (props) => {
    const [aCategorias, setaCategorias] = useState([]);
    const [bActivo, setBActivo] = useState(false);
    const [valor, setValor] = useState({
        _id: "",
        sNombre : "",
        aEtiqueta: [
             
        ],
        dFechaPublicacion: "2020-02-17T01:50:48.564Z",
        sTexto : "",
        iPrecio2: 0,
        sUrlVideo: "",
        sUrlImagen: "",
        // bActivo: true,
        recetaModificado:"",
        redirect:false,
        loading: false,
        error : false,
        formData:"",
        sUrlVideoTrailer:""
    });


  
    

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
        // bActivo,
        loading,
        error,
        recetaModificado,
        redirect,
        formData,
        sUrlVideoTrailer,
       
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


                console.log('modificar receta' + data);
                // console.log('data.bActivo'+data.bActivo)
                setValor({
                    ...valor,
                    _id: data._id, 
                    sNombre: data.sNombre,
                    aEtiqueta: data.aEtiqueta,
                    sTexto: data.sTexto,
                    iPrecio2: data.iPrecio,
                    sUrlVideo: data.sUrlVideo,
                    sUrlImagen: data.sUrlImagen,
                    // bActivo: data.bActivo,
                    sUrlVideoTrailer:data.sUrlVideoTrailer,
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
        cargarCategoriaDisponibles()
//        console.log(aCategorias,'----',valor)
        
    }, []);

    const handleArrayChange =(key,item)=> event => {
      
        
        console.log(event)
        if(item.add){
            
             aCategorias[key].add=false
            setaCategorias([...aCategorias]  );      
            
        }else{
            aCategorias[key].add=true
            setaCategorias([...aCategorias] );      

        }
   
 
        console.log(aCategorias)
       } 

    const handleActivoSiChange =(bool)=> event => {
            setBActivo(true);      
        console.log('activosi???? '+bActivo)
       } 

    const handleActivoNoChange =(bool)=> event => {
                setBActivo(false);      
            console.log('activono???? '+bActivo)
        } 

    const ReturnCategorias=()=>{
      const etiqueta=[];
        aCategorias.forEach(element => {
            if (element.add) {
                etiqueta.push(element._id)    
            }
            
            
        });

        return etiqueta
       }


       const Returncheckbox=()=>{
        return  (<div className="form-group">
                <label className="text-muted required"> Categoria ▼ </label>
                { aCategorias.map((item, key) =><div key=  {key}>
                      {/* {key}       {''+item.add} */}
                <Checkbox key={key} onChange={handleArrayChange(key,item)} value={item.add}> {item.sNombre}</Checkbox>

                  </div>)}   

                </div>)
        
       }

    //    cambiar el estado de activo de la receta 
       const returnActivo=()=>{
        return  (<div className="form-group d-flex flex-column">
                <label className="text-muted"> ¿Deseas Activar o Desactivar la receta? </label>
                <div className="form-group d-flex flex-row radio">
                    <label className="text-muted mr-2">No</label>
                    <input type="radio" name="gender" onChange={handleActivoNoChange(bActivo)}/>
                    <label className="text-muted mx-2">Si</label>
                    <input type="radio" name="gender" onChange={handleActivoSiChange(bActivo)}/>
                 
                </div>
                </div>)
        
       }
    


       const cargarCategoriaDisponibles = () => {
        getObjeto('Categoria')
        .then(data=>{
            
            if(data=== undefined){
                
                
                setValor({...valor,error:errorTranslator('Problemas, intente mas tarde')});
            }  else{
                if ('error' in data) {
                    setValor({...valor,error:errorTranslator(data.error.message)});
                    
                }else{
                    console.log(data);
                    data.value.forEach(element => {
                   
                            element['add']=false    
                       
                        
                    });

                    
                    setaCategorias(data.value);
                    
                 
                }
            }
            
        })
    }

    //funcion esta retornando otra funcion
    //el sNombre se va a ir cambiando, primero va ser foto, despues nombre, ...
    const handleChange = sNombre => event => {
        event.preventDefault();
        //entonces cuando se agrega, se va a guardar todo en formData
        //formData.set(sNombre, valor);
        setValor({...valor, [sNombre]:  event.target.value});
        console.log(aCategorias,'----',valor);
        console.log('activo???'+bActivo)
    }

    const clickSubmit =(event)=>{

       
  
        event.preventDefault();
        const asd=ReturnCategorias()
        const iPrecio = parseInt(iPrecio2);
        const resultado=checkingReceta({sNombre,aEtiqueta:asd,dFechaPublicacion,
            sTexto,iPrecio,sUrlVideo,sUrlImagen,bActivo,sUrlVideoTrailer})

          if (resultado.valido) {
            setValor({...valor, error:'', loading:true});
            modificarObjeto('Receta', {_id,sNombre,aEtiqueta:asd,sTexto,
                iPrecio,sUrlVideo,sUrlImagen,bActivo,dFechaPublicacion,sUrlVideoTrailer})
            .then(data=>{
         
                if (data === undefined) {
                    setValor({
                        ...valor,
                        error: 'Problemas, intente mas tarde'
                    })
                } else{
                    setValor({
                        recetaModificado: true,
                        redirect:true
                    }) 
                }      
            })      
          }else{
            setValor({...valor, error:resultado.incidente});
          }  
        
        
    }


    const agregarRecetaForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>

        <div className="form-group">
        <label className="text-muted">Nombre </label>
        <input onChange={handleChange('sNombre')} 
                type="text" 
                className="form-control" 
                required
                value={sNombre} />
    </div>

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
            <label className="text-muted">Ingresar link del trailer de la receta: </label>
            <input onChange={handleChange('sUrlVideoTrailer')} 
                    type="text" 
                    className="form-control" 
                  
                    value={sUrlVideoTrailer} />
        </div>
           
         {Returncheckbox()}

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
            {returnActivo()}



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
        <Layout jumbotron="jumboEstatico"
        image={sUrlImagen}  
        titulo={`MODIFICAR RECETA : ${sNombre}`}
        descripcion=""
        className="container-fluid">
          
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">     

                    {/* btn regresar a receta general  */}
                    <Link to={`/Receta`}>
                            <button className="btn btn-outline-primary
                                agregarPadding mb-5" data-toggle="modal" data-target="#exampleModal">
                                    Regresar a Receta General
                            </button>
                    </Link>
                            
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarRecetaForm()}
                    {redireccionarUsuario()}

                    <Link to={`../Eliminar/${_id}`}>
                            <button className="btn btn-outline-primary
                                agregarPadding mb-5" data-toggle="modal" data-target="#exampleModal">
                                    Eliminar Receta
                            </button>
                    </Link>
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default ModificarReceta;