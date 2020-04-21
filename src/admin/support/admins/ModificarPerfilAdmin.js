import React, { Fragment,useState,useEffect } from 'react';
import Layout from '../../../nucleo/Layout';
import {readPerfil, modificarPerfil,modificarPerfilLocal, isAutentificacion} from  '../../../autentificacion/index';
import {Link, Redirect} from 'react-router-dom';
import '../../../index.css'
import '../../../css.css';
 

const ModificarPerfilAdmin = ({match}) => {
    const [values,setValues] = useState({
        sNombre: "",
        sApellido: "",
        sContrasena: "",
        password: "",
        sCorreo: "",
        dNacimiento: "",
        aFavoritos: [],
        aRecetas: [],
        bAdmin:true,
        
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
        aPermisos: [],
        error:false,
        funciona: false

    });

    const {
        sNombre,
        sApellido,
        sContrasena,
        password,
        sCorreo,
        dNacimiento,
        aPermisos,
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
        bAdmin,
        aRecetas,listo
    } = values;

    const {token} = isAutentificacion();

    const init = (perfilId) => {
        readPerfil(perfilId, token).then((data={error:{message:'Hay un problema intente mas tarde'}} )=>{
             
            if('error' in data ){
                setValues({...values, error:data.error.message, funciona: false});

            }else{
                setValues({
                    ...values,
                    _id:data._id,
                    sNombre: data.sNombre,
                    sApellido: data.sApellido,
                    sContrasena: data.sContrasena,
                    password: "",
                    sCorreo: data.sCorreo,
                    dNacimiento: data.dNacimiento,
                    aPermisos:data.aPermisos,
                    bAdmin:data.bAdmin,
                    oDireccion: {
                        provincia:dProvincia,
                        canton:data.dCanton,
                        direccion1:data.dDireccion1,
                        direccion2:data.dDireccion2,
                        codPostal:data.dCodPostal,
                        telefono:data.dTelefono,
                    },
                    dProvincia:data.oDireccion.provincia,
                    dCanton:data.oDireccion.canton,
                    dDireccion1:data.oDireccion.direccion1,
                    dDireccion2:data.oDireccion.direccion2,
                    dCodPostal:data.oDireccion.codPostal,
                    dTelefono:data.oDireccion.telefono,
                })
            }
        });
    }
    
    useEffect(()=>{
        init(match.params.perfilId);
    }, []);

    const handleChange = sNombre=> e =>{
        
            
            console.log(values);
        setValues({...values, error: false, [sNombre]: e.target.value});
            oDireccion.provincia=dProvincia;
            oDireccion.canton=dCanton;
            oDireccion.direccion1=dDireccion1;
            oDireccion.direccion2=dDireccion2;
            oDireccion.codPostal=dCodPostal;
            oDireccion.telefono=dTelefono;
        
    }

    oDireccion.provincia=dProvincia;
            oDireccion.canton=dCanton;
            oDireccion.direccion1=dDireccion1;
            oDireccion.direccion2=dDireccion2;
            oDireccion.codPostal=dCodPostal;
            oDireccion.telefono=dTelefono;
    

    const clickSubmit = (e) => {

            
 
        e.preventDefault();
        modificarPerfil(match.params.perfilId, token, {
            _id:match.params.perfilId,
            sNombre,
            sApellido,
            sContrasena,
            sCorreo,
            dNacimiento,
            oDireccion,
            aPermisos,
            bAdmin,
        }).then((data={error:{message:'Hay un problema intente mas tarde'}} ) =>{
           
            if('error' in data ){
                setValues({...values, error:data.error.message, funciona: false});

            }else{
                data=data.value;
                modificarPerfilLocal(data, ()=>{
                    setValues({
                        ...values,
                        _id: data._id,
                        sNombre: data.sNombre,
                        sApellido: data.sApellido,
                        sContrasena: data.sContrasena,
                        password: "",
                        sCorreo: data.sCorreo,
                        dNacimiento: data.dNacimiento,
                        oDireccion: data.oDireccion,
                        aRecetas: data.aRecetas,
                        aFavoritos: data.aFavoritos,    
                        bActivo: data.bActivo,
                        bAdmin:data.bAdmin,
                        funciona:true
                    })
                });
            }
            console.log(values);
        });
    }

    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
           
        </div>
        
    );

    const redireccionarUsuario = (funciona) =>{
        if(funciona){
            return <Redirect to="/Admin"/>
        }
    }

    const modificarPerfilForm = (
        sNombre,
        sApellido,
        sContrasena,
        password,
        sCorreo,
        dNacimiento,
        dProvincia,
        dCanton,
        dDireccion1,
        dDireccion2,
        dCodPostal,
        dTelefono) => (
        <form>
            <div className="row">
            <div className="col-lg-6">
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Nombre 
                    </label>
                    <input name="sNombre" onChange={handleChange('sNombre')}  type="text" 
                        className="form-control" value={sNombre}/>
                </div>
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Apellido 
                    </label>
                    <input name="sApellido" onChange={handleChange('sApellido')}  type="text" 
                        className="form-control" value={sApellido}/>
                </div>
                
                
                {/*<div className="form-group mt-30">
                    <label className="text-muted">
                        Contraseña 
                    </label>
                    <input name="sContrasena" onChange={handleChange('sContrasena')}  type="password" 
                        className="form-control" value={sContrasena}/>
                </div>
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Confirmar Contraseña 
                    </label>
                    <input name="password"   type="password" 
                        className="form-control"/>
                </div>  
        */}

                <div className="form-group mt-30">
                    <label className="text-muted">
                        Correo Electronico 
                    </label>
                    <input name="sCorreo" onChange={handleChange('sCorreo')}  type="email" 
                        className="form-control" value={sCorreo}/>
                </div>
                <div className="form-group mt-30">
                    <label className="text-muted">
                        Fecha Nacimiento
                    </label>
                    <input name="sCorreo" onChange={handleChange('dNacimiento')}  type="text" 
                        className="form-control" value={dNacimiento}/>
                </div>
            </div>
            <div className="col-lg-6">
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
            </div>
            <div className="btnCentral">
            <button   onClick={clickSubmit}   className="btn btn-outline-primary btnCentral">
                Modificar Cuenta
            </button>
            </div>
            </div>
        </form>
    );

    return (
        <Layout jumbotron="jumbotronMovimiento"
        image="https://wallroom.io/img/2560x1440/bg-e4f1f74.jpg"
        titulo="Modificar Perfil" 
        descripcion={`${sNombre} ${sApellido}`} 
        className="container mt-5">
            {mostrarError()}
            {redireccionarUsuario(funciona)}
            {modificarPerfilForm(
                sNombre,
                sApellido,
                sContrasena,
                password,
                sCorreo,
                dNacimiento,
                dProvincia,
                dCanton,
                dDireccion1,
                dDireccion2,
                dCodPostal,
                dTelefono
            )}
            
            

        </Layout>

    )
}

export default ModificarPerfilAdmin;