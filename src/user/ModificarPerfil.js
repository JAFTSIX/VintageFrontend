import React, { Fragment,useState,useEffect } from 'react';
import Layout from '../nucleo/Layout';
import {readPerfil, modificarPerfil,modificarPerfilLocal, isAutentificacion} from '../autentificacion';
import {Link} from 'react-router-dom';
import '../index.css';  
import '../css.css';
 

const ModificarPerfil = ({match}) => {
    const [values,setValues] = useState({
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
        sPermisos: "",
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
        sPermisos,
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
    } = values;

    const {token} = isAutentificacion();

    const init = (perfilId) => {
        readPerfil(perfilId, token).then(data=>{
            if(data.error){
                setValues({...values, error:true});
            }else{
                setValues({
                    ...values,
                    sNombre: data.sNombre,
                    sApellido: data.sApellido,
                    sContrasena: data.sContrasena,
                    password: "",
                    sCorreo: data.sCorreo,
                    dNacimiento: data.dNacimiento,
                    oDireccion: {
                        provincia:data.oDireccion.provincia,
                        canton:data.oDireccion.canton,
                        direccion1:data.oDireccion.direccion1,
                        direccion2:data.oDireccion.direccion2,
                        codPostal:data.oDireccion.codPostal,
                        telefono:data.oDireccion.telefono,
                    }
                })
            }
        });
    }
    
    useEffect(()=>{
        init(match.params.perfilId);
    }, []);

    const handleChange = (e) =>{
        //
    }

    const modificarPerfilForm = (
        sNombre,
        sApellido,
        sContrasena,
        password,
        sCorreo,
        dNacimiento,
        provincia,
        canton,
        direccion1,
        direccion2,
        codPostal,
        telefono) => (
        <form>
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
            <div className="form-group mt-30">
                <label className="text-muted">
                    Contraseña 
                </label>
                <input name="sContrasena" onChange={handleChange('sContrasena')}  type="text" 
                    className="form-control" value={sContrasena}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Confirmar Contraseña 
                </label>
                <input name="dProvincia"   type="text" 
                    className="form-control" value={}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Correo Electronico 
                </label>
                <input name="sCorreo" onChange={handleChange('sCorreo')}  type="text" 
                    className="form-control" value={sCorreo}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Fecha Nacimiento
                </label>
                <input name="sCorreo" onChange={handleChange('dNacimiento')}  type="text" 
                    className="form-control" value={dNacimiento}/>
            </div>

            <div className="form-group mt-30">
                <label className="text-muted">
                    Provincia 
                </label>
                <input name="oDireccion.provincia" onChange={handleChange('oDireccion.provincia')}  type="text" 
                    className="form-control" value={oDireccion.provincia}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Cantón 
                </label>
                <input name="oDireccion.canton" onChange={handleChange('oDireccion.canton')}  type="text" 
                    className="form-control" value={oDireccion.canton}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Dirección 1 
                </label>
                <input name="oDireccion.direccion1" onChange={handleChange('oDireccion.direccion1')}  type="text" 
                    className="form-control" value={oDireccion.direccion1}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Dirección 2 
                </label>
                <input name="oDireccion.direccion2" onChange={handleChange('oDireccion.direccion2')}  type="text" 
                    className="form-control" value={oDireccion.direccion2}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Código Postal 
                </label>
                <input name="oDireccion.codPostal" onChange={handleChange('oDireccion.codPostal')}  type="text" 
                    className="form-control" value={oDireccion.codPostal}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Teléfono 
                </label>    
                <input name="oDireccion.telefono" onChange={handleChange('oDireccion.telefono')}  type="text" 
                    className="form-control" value={oDireccion.telefono}/>
            </div>

        </form>
    );

    return (
        <Layout jumbotron="jumbotronMovimiento"
        image="https://wallroom.io/img/2560x1440/bg-e4f1f74.jpg"
        titulo="Modificar Perfil" 
        // descripcion={`${sNombre} ${sApellido}`} 
        className="container-fluid mt-5">

            {modificarPerfilForm(
                sNombre,
                sApellido,
                sContrasena,
                password,
                sCorreo,
                dNacimiento,
                oDireccion.provincia,
                oDireccion.canton,
                oDireccion.direccion1,
                oDireccion.direccion2,
                oDireccion.codPostal,
                oDireccion.telefono,
            )}

        </Layout>

    )
}

export default ModificarPerfil;