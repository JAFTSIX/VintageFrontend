import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
 
 
import { insertObject,errorTranslator, getObjeto} from './apiAdmin';
import '../index.css';
import '../css.css';
import {checkingReceta} from '../user/procesos/ValidarDatos';
import { Checkbox } from 'react-input-checkbox';


const AgregarReceta = () => {
    const [valor, setValor] = useState({
        sNombre : "",
        aEtiqueta: [ 
        ],
        dFechaPublicacion: "2020-02-17T01:50:48.564Z",
        sTexto : "",
        iPrecio2: 0,
        sUrlVideo: "",
        sUrlImagen: "",
        sUrlVideoTrailer: "",
        bActivo: true,
        loading: false,
        error : "",
        recetaCreado:"",
        redirect:false,
        formData:"",
        aCargado: [ 
        ]
    });



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
        formData,
        aCargado,
        sUrlVideoTrailer
    } = valor;


    useEffect( ()=>{
        cargarCategoriaDisponibles()
        console.log(aCargado)
    }, []);

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

                    setValor({...valor,aCargado:data.value});
                    
                 
                }
            }
            
        })
    }



    const handleArrayChange =(key,item)=> event => {
    
        
        
        if(item.add){
            
             aCargado[key].add=false
            setValor({...valor, aCargado:aCargado });      
            
        }else{
            aCargado[key].add=true
            setValor({...valor, aCargado: aCargado});      

        }
   
   
        console.log(aCargado)
       } 

       const ReturnCategorias=()=>{
        
        aCargado.forEach(element => {
            if (element.add) {
                aEtiqueta.push(element._id)    
            }
            
            
        });


         setValor({...valor, aEtiqueta:aEtiqueta });  
       }
    //funcion esta retornando otra funcion
    //el sNombre se va a ir cambiando, primero va ser foto, despues nombre, ...
    const handleChange = name => event => {
        //entonces cuando se agrega, se va a guardar todo en formData
        //formData.set(sNombre, valor);
 
        if (name=='bActivotrue') {
            setValor({...valor, bActivo:false  });
        } else if(name=='bActivofalse') {
            setValor({...valor, bActivo:true  });
        }else{
            setValor({...valor, [name]:  event.target.value});
        }
        
    }

    const clickSubmit =(event)=>{
        ReturnCategorias()
        const iPrecio = parseInt(iPrecio2);
        event.preventDefault();
        setValor({...valor, error:'', loading:true});

        const resultado=checkingReceta({sNombre,aEtiqueta,dFechaPublicacion,
            sTexto,iPrecio,sUrlVideo,sUrlImagen,bActivo})
        if (resultado.valido) {
        
            insertObject('Receta', {sNombre,aEtiqueta,dFechaPublicacion,
                    sTexto,iPrecio,sUrlVideo,sUrlVideoTrailer,sUrlImagen,bActivo})
                .then((data={error:{message:'hay un problema, intente más tarde'}})=>{


                     
                     if('error' in data){
                        setValor({...valor, error:errorTranslator(data.error.message)});
                    }else{
                        setValor({
                            ...valor, 
                            sNombre: "",
                            sTexto: "",
                            iPrecio: 0,
                            bActivo: true,
                            sUrlVideo: "",
                            sUrlImagen: "",
                            sUrlVideoTrailer:"",
                            loading: false,
                            recetaCreado: data.sNombre,
                        })
                    }
                    
                })
            } else {
                setValor({...valor, error:resultado.incidente});
            }

        
        
        
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
            <label className="text-muted">Ingresar link del trailer de la receta: </label>
            <input onChange={handleChange('sUrlVideoTrailer')} 
                    type="text" 
                    className="form-control" 
                    required
                    value={sUrlVideoTrailer} />
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
                {aCargado.map((item, key) =><div>
                                    
                    <Checkbox onChange={handleArrayChange(key,item)}    value={item.add}> {item.sNombre}</Checkbox>

                </div>)}   

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

            <div className="form-group">
            <label className="text-muted mr-2">¿Activo? </label>
                      <Checkbox  onChange={handleChange('bActivo'+bActivo)}  value={bActivo}> </Checkbox>

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
        <Layout jumbotron="jumboEstatico" 
        image="https://www.actualidadviajes.com/wp-content/uploads/2019/12/Francia-macarons.jpg"
        titulo="Agregar Receta" 
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