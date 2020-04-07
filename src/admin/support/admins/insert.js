import React, {useState,useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import Menu from '../../../nucleo/Menu';
import candado from './../../../user/Img/candado.jpg';
import {Link} from 'react-router-dom';
import {resultado,HandleChangeValidation,checkingCliente } from './../../../user/procesos/ValidarDatos';
import '../../../index.css'

import {isAutentificacion} from './../../../autentificacion/index';
import Footer from '../../../nucleo/Footer';
import { insertObject,getObjeto}    from '../../apiAdmin';

import { Checkbox } from 'react-input-checkbox';



const SignUpAdmin = () => {
 
    const [ver, setver] = useState(false)
    const [aPermisos, setaPermisos] = useState({
        createTbCategoria:false,
        deleteTbCategoria:false,
        updateTbCategoria:false,

       
        createTbReceta:false,
        updateTbReceta:false,

        findTbHistorial:false,
        
        findTbFactura:false,

        createTbArticulo:false,
        updateTbArticulo:false,

        createTbCliente:false,
        updateTbCliente:false,
        
        manageAdmin:false,
        manageClientes:false,
        manageHimself:false,

      
    } )

    const [values, setValues] = useState({
        sNombre: "",
        sApellido: "",
        sContrasena: "",
        password: "",
        sCorreo: "",
        dNacimiento: "",
        aFavoritos: [],
        aRecetas: [],
        oDireccion: {
            provincia:"",
            canton:"",
            direccion1:"",
            direccion2:"",
            codPostal:"",
            telefono:"",
        },
        dProvincia:"",
        dCanton:"",
        dDireccion1:"",
        dDireccion2:"",
        dCodPostal:"",
        dTelefono:"",
        bActivo: true,        
        error:false,
        funciona: false,
        listo:false,
        
    });


/**
 * destruve el signUp State
 * para ser declarado como nombre en vez de SignUp.values.nombre
 */
const {
    sNombre,
    sApellido,
    sContrasena,
    password,
    sCorreo,
    dNacimiento,
 
    error,
    funciona,
    aFavoritos,
    oDireccion,
    dProvincia,
    dCanton,
    dDireccion1,
    dDireccion2,
    dCodPostal,
    dTelefono,
    bActivo,
    aRecetas,listo
} = values

const getPermisos=()=>{
    
        const arrreglo=[];
        for (const prop in aPermisos) {
            

            if (aPermisos[prop]) {
                arrreglo.push(prop)
            }
          }
    return arrreglo
}
 
const handleChange = campo => event => {

    event.preventDefault();
    const {
        name,
        value
    } = event.target;

    //rellenar el objeto oDireccion
   oDireccion.provincia=dProvincia;
   oDireccion.canton=dCanton;
   oDireccion.direccion1=dDireccion1;
   oDireccion.direccion2=dDireccion2;
   oDireccion.codPostal=dCodPostal;
   oDireccion.telefono=dTelefono;
   
   const resultado=HandleChangeValidation(name,value)
  
   if (resultado.valido) {
  
        setValues({...values,error: false, [campo]: event.target.value});
   }else{
   
        setValues({...values,error:resultado.incidente, [campo]: event.target.value});
   }


}


    const crearCuenta = (event) => {
   
        event.preventDefault(); 
        setValues({...values, error:false});
 

    const resultado=checkingCliente({sNombre, sApellido, sContrasena, sCorreo, 
        dNacimiento, aFavoritos, oDireccion, bActivo,aRecetas,aPermisos:getPermisos()})
         
    const spermisos=getPermisos()

    if (resultado.valido&&password===sContrasena) {
        insertObject('Admin',{sNombre, sApellido, sContrasena, sCorreo, aPermisos:getPermisos(),
            dNacimiento:new Date(''.concat(dNacimiento.toString(),'T12:00:00')), aFavoritos, oDireccion, bActivo,aRecetas})
        //funcion para comprobar si se crea la cuenta con exito
        .then( (data={error:{message:'hay un problema, intente más tarde'}} ) =>{

            
            //si hay error
            if('error' in data ){
                setValues({...values, error:data.error.message, funciona: false});

            }//si no hay error, se vacia los textbox
            else {
                setValues({
                    ...values,
                    sNombre: '',
                    sApellido: '',
                    sContrasena: '',
                    sCorreo: '',
                    oDireccion: '',
                    dProvincia:'',
                    dCanton:'',
                    dDireccion1:'',
                    dDireccion2:'',
                    dCodPostal:'',
                    dTelefono:'',
                    dNacimiento: '',
                    password:'',
                    error: false,                
                    funciona: true
                });
            }
        });
    } else {
       //oops
       setValues({...values,error:''.concat(resultado.incidente,' , Por favor llene correctamente todo el formulario antes de enviar'), funciona: false});
    }
        


    }

    const handleArrayChange =(value)=> event => {
        
        setaPermisos({...aPermisos, [value]:aPermisos[value]?false:true });
         
    }

    
 
    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
           
        </div>
        
    );
        
    

    const mostrarFunciona =  () => (
        <div className="alert alert-info" 
        style={{display: funciona ? '' : 'none'}}>
            Cuenta creada exitosamente. Por favor <Link to="/signin">Iniciar Session</Link>
        </div>
    );

    const mostrarDenegado =  () => (
        <div className="alert alert-info" >
            Esta cuenta no hay suficientes permisos <Link to="/signin">Iniciar Session con otra cuenta con más permiosos</Link>
        </div>
    );

    const direccionForm = () => (
        <form>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Provincia 
                </label>
                <input name="dProvincia" onChange={handleChange('dProvincia')}  type="text" 
                    className="form-control" value={dProvincia}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Cantón 
                </label>
                <input name="dCanton" onChange={handleChange('dCanton')}  type="text" 
                    className="form-control" value={dCanton}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Dirección 1 
                </label>
                <input name="dDireccion1" onChange={handleChange('dDireccion1')}  type="text" 
                    className="form-control" value={dDireccion1}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Dirección 2 
                </label>
                <input name="dDireccion2" onChange={handleChange('dDireccion2')}  type="text" 
                    className="form-control" value={dDireccion2}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Código Postal 
                </label>
                <input name="dCodPostal" onChange={handleChange('dCodPostal')}  type="text" 
                    className="form-control" value={dCodPostal}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Teléfono 
                </label>    
                <input name="dTelefono" onChange={handleChange('dTelefono')}  type="text" 
                    className="form-control" value={dTelefono}/>
            </div>


        </form>
        
            
    );


    //JSON.stringify(values) --> ver los var en string mostrado en pantalla
    //sirve para debug
    const signUpForm = () =>(
        <form>
            <div className="row">
            <div className="col-lg-6">
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Nombre *
                    </label>
                    <input name="sNombre" onChange={handleChange('sNombre')} type="text" className="form-control" 
                    value={sNombre}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">
                        Primer Apellido *
                    </label>
                    <input name="sApellido" onChange={handleChange('sApellido')}  type="text" 
                    className="form-control" value={sApellido}/>
                </div>

                <div className="form-group">
                    <label className="text-muted">
                        Fecha de nacimiento *
                    </label>
                    <input name="dNacimiento" onChange={handleChange('dNacimiento')}  type="date" 
                    className="form-control"
                    value={dNacimiento }/>
                </div>

                <div className="form-group">
                    <label className="text-muted">
                        Email *
                    </label>
                    <input name="sCorreo" onChange={handleChange('sCorreo')}  type="email" 
                    value={sCorreo} className="form-control" />
                
                </div>

                <div className="form-group">
                    <label className="text-muted">
                        Contraseña *
                    </label>
                    <input name="sContrasena" onChange={handleChange('sContrasena')}  type="password" 
                    value={sContrasena} className="form-control" />
            
                </div>

                <div className="form-group">
                    <label className="text-muted">
                        Confirmar Contraseña *
                    </label>
                    <input name="password" value={password}  onChange={handleChange('password')}  type="password" className="form-control" />
                </div>
            </div>
            <div className="col-lg-6">
                {direccionForm()}
            </div>
            </div>  
       
            <div className="form-group">
                    <label className="text-muted">
                      Articulos
                    </label>
               <Checkbox    onChange={handleArrayChange('createTbArticulo')}    value={aPermisos.createTbArticulo}>
                    <label className="mr-5 ml-1 align-item-center justify-content-center">Agregar</label>
               </Checkbox>

               <Checkbox    onChange={handleArrayChange('updateTbArticulo')}    value={aPermisos.updateTbArticulo}>
               <label className="mr-5 ml-1 align-item-center justify-content-center">actualizar</label>
                </Checkbox>
            </div>
       
            <div className="form-group">
            <label className="text-muted">
                Recetas
            </label>
            <Checkbox    onChange={handleArrayChange('createTbReceta')}    value={aPermisos.createTbReceta}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">Agregar</label>
            </Checkbox>
            <Checkbox    onChange={handleArrayChange('updateTbReceta')}    value={aPermisos.updateTbReceta}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">actualizar</label>
            </Checkbox>
            </div>
            
            <div className="form-group">
            <label className="text-muted">
                Catergorias
            </label>
            <Checkbox    onChange={handleArrayChange('createTbCategoria')}    value={aPermisos.createTbCategoria}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">Agregar</label>
            </Checkbox>
            <Checkbox    onChange={handleArrayChange('updateTbCategoria')}    value={aPermisos.updateTbCategoria}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">actualizar</label>
            </Checkbox>
            <Checkbox    onChange={handleArrayChange('deleteTbCategoria')}    value={aPermisos.deleteTbCategoria}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">eliminar</label>
            </Checkbox>
            </div>
            
            
            <div className="form-group">
            <label className="text-muted">
                Cliente
            </label>
            <Checkbox    onChange={handleArrayChange('createTbCliente')}    value={aPermisos.createTbCliente}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">Agregar</label>
            </Checkbox>
            <Checkbox    onChange={handleArrayChange('updateTbCliente')}    value={aPermisos.updateTbCliente}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">actualizar</label>
            </Checkbox>
            <Checkbox    onChange={handleArrayChange('manageAdmin')}    value={aPermisos.manageAdmin}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">crear o manipular otros administradores</label>
            </Checkbox>
            <Checkbox    onChange={handleArrayChange('manageClientes')}    value={aPermisos.manageClientes}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">crear o manipular clientes</label>
            </Checkbox>
            <Checkbox    onChange={handleArrayChange('manageHimself')}    value={aPermisos.manageHimself}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">manipular sus propios permisos*ADVERTENCIA* </label>
            </Checkbox>
            </div>


            <div className="form-group">
            <label className="text-muted">
             facturas
            </label>
            <Checkbox    onChange={handleArrayChange('createTbArticulo')}    value={aPermisos.findTbFactura}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">ver facturas</label>
            </Checkbox>
            </div>

            <div className="form-group">
            <label className="text-muted">
             historial
            </label>
            <Checkbox    onChange={handleArrayChange('createTbArticulo')}    value={aPermisos.findTbHistorial}>
                <label className="mr-5 ml-1 align-item-center justify-content-center">ver historial</label>
            </Checkbox>
            </div>

            <div className="btnCentral">
            <button   onClick={crearCuenta}   className="btn btn-outline-primary btnCentral">
                Crear Cuenta
            </button>
            </div>
            
        </form>
    );


    const se_puede=()=>{
        
        const user =getObjeto('Cliente','/'+isAutentificacion().cliente._id).then( 
            (data={error:{message:'hay un problema, intente más tarde'}} ) =>{

            
                //si hay error
                if('error' in data ){
                    setValues({...values, error:data.error.message, funciona: false});
    
                }//si no hay error, se vacia los textbox
                else {
                    
                    
                    if (data.bAdmin &&data.aPermisos !== undefined 
                    && data.aPermisos.indexOf('manageAdmin') !== -1) {
                        console.log(data)
                        setver(true)
                      }
                }
            }
        )
    
    }

    useEffect( ()=>{
        if (isAutentificacion) {
             
            se_puede()    

        }  
        
    }, []);

    return (
        <div className="contenido">
            <Menu />
            <div className="container col-md-8 offset-md-2 mt-5 pt-5">
                <img src={candado} className="rounded mx-auto d-block img-fluid mt-5 mt-11" alt="..."
                height="100" width="100" />

                <div className="espacioV .mt-11">
                {ver&&
                    <e>
                    {mostrarFunciona()}
                    {mostrarError()}
                    {signUpForm()}
                    </e>                
                }
                    
                {!ver&& 
                    <pollo>
                    {mostrarError()}
                    {mostrarDenegado()}
                    </pollo>
                }   
                </div>

                
            </div>

            <Footer />
        </div>   
    );    
}


export default SignUpAdmin;
 