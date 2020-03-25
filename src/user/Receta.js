import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import { isAutentificacion } from '../autentificacion';
import { Link } from 'react-router-dom';
import {getReceta} from './apiReceta';
import RecetaInterfaz from './RecetaInterfaz';
import '../index.css';
import '../css.css';
import {errorTranslator,getObjeto} from './../admin/apiAdmin'; 
import { Checkbox } from 'react-input-checkbox';

const Receta = () => {
    //const [productoVendidos, setProductoVendidos] = useState([]);
    const [receta, setReceta] = useState([]);
    const [error, setError] = useState(false);
    const [aCategorias, setaCategorias] = useState([])
    const [snombre, setsNombre] = useState('')
    //cargar productos para visualizar
    
    const cargarReceta = (query='') => {
      

        getObjeto('Receta',query)
        .then(data=>{
            
            if(data=== undefined){

                setError( errorTranslator('Problemas, intente mas tarde'));
            } else {

                if ('error' in data) {

                    setError(errorTranslator(data.error.message))
                    
                    
                }else{
                   
          
                    setReceta(data);
                    console.log(data);
                    
                     
                    
                }
                
            }
            
        })
    }

    const Returncheckbox=()=>{
        return  (<div className="form-group">
                <label className="text-muted"> Categorias </label>
                { aCategorias.map((item, key) =><div key=  {key}>
                    
                <Checkbox key=  {key}   onChange={handleArrayChange(key,item)}    value={item.add}> {item.sNombre}</Checkbox>

                  </div>)}   

                </div>)
        
       }
    
       
    const handleArrayChange =(key,item)=> event => {
      
        
        //console.log(event)
        if(item.add){
            
             aCategorias[key].add=false
            setaCategorias([...aCategorias]  );      
            
        }else{
            aCategorias[key].add=true
            setaCategorias([...aCategorias] );      

        }
        
        actualizar()
    }
    
    const actualizar = () => {
        const query=snombre;
        console.log('query->'+query)
        
        var array = [];
        for (let index = 0; index < aCategorias.length; index++) {

            if (aCategorias[index].add) {
                array.push(aCategorias[index]._id)
            }

        }
        if (array.length>0&&query!='') {
            cargarReceta(''+`?filter={"where":{"aEtiqueta":${JSON.stringify(array)}    , "sNombre": "${query}"}}`)
            console.log('camino 1')
            console.log(''+`?filter={"where":{"aEtiqueta":${JSON.stringify(array)}    , "sNombre": "${query}"}}`)
        }else if(array.length>0){
            cargarReceta(''+`?filter={"where":{"aEtiqueta":${JSON.stringify(array)}}}`)
            console.log('camino 2')
        }
        else if( array.length==0&&query!=''){
            cargarReceta(`?filter={"where":{"sNombre":  {"regexp": "/${query}/i"}}}`)
            console.log('camino 3')
        }
        else{
            cargarReceta('')
            console.log('camino 4')
        }
        

    }

    const cargarCategoriaDisponibles = () => {
     
        getObjeto('Categoria')
        .then(data=>{
            
            if(data=== undefined){

                setError( errorTranslator('Problemas, intente mas tarde'));
            } else {

                if ('error' in data) {

                    setError(errorTranslator(data.error.message))
                    
                    
                }else{
                   
                    data.value.forEach(element => {            
                            element['add']=false                           
                        
                    });

                    
                    setaCategorias(data.value);
                    
                }
                
            }
            
        })
    }

    //carga al puro principio y cuando sea que se haga cambio va a cargar 
    useEffect(()=>{
        cargarReceta()
        cargarCategoriaDisponibles()
    }, []);
    
    const handleChange = campo  => event => {
        event.preventDefault();
      
        setsNombre( event.target.value);

         console.log(snombre);
     }


     const clickSubmit = () => {

        actualizar()

     }


    const crudReceta = () => {
        return(
            <div className="">               
                <ul className="list-group">                   
                    <li className="list-group-item border-0 mw-100 p-0 mb-5 mt-3">
                        <Link className="nav-link btn btn-outline-primary 
                            mt-2 mb-2 agregarPadding mr-2"
                             to="/receta/agregar">
                            Agregar Receta
                        </Link>
                    </li>
                                    
                </ul>
            </div>
        );
    }

    const mostrarCrud = () => {
        if(isAutentificacion() 
        && isAutentificacion().cliente.bAdmin){
            return(
                <div>
                    {crudReceta()}
                </div>
            );
        }else{
            return("");
        }
    }

    return (
        <Layout jumbotron="jumbotronMovimiento" 
        image="https://www.elsetge.cat/myimg/f/234-2349477_pastel-macarons.jpg"
        titulo="RECETA" 
        descripcion="Chef Selenia Mendez"   
        className="container-fluid">
            
            {/* funciones de admin */}
            <div className="row mt-5">  
                <div className="col-12">                   
                    {mostrarCrud()}
                </div>
            </div>
            
            {/* contenido principal */}
            <div className="row">            
          
            <div className="col-lg-6">
              <div className="input-group">
              <div className="d-inline">       
                <input type="text" onChange={handleChange('snombre')} className="form-control"/>
                </div>
                
                    <div className="d-inline">
                    
                    <span className="input-group-btn">
            <button className="btn btn-default" onClick={clickSubmit} type="button">Buscar</button>
                    </span>
                    </div>
               
              </div>
            </div>
            </div>

 
            <div>
           
            {Returncheckbox()}

            </div>
            <div className="row maxheigh">     
                                       
                {receta.map((receta, i)=>(
                    <RecetaInterfaz key={i} receta={receta}/>
                ))}                   

            </div>
                

        </Layout>
    );
}

export default Receta;