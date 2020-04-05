import React, {useState} from 'react';
import Layout from '../nucleo/Layout';
import Menu from '../nucleo/Menu';
import candado from './Img/candado.jpg';
import {Link} from 'react-router-dom';
import {resultado,HandleChangeValidation,checkingCliente } from './procesos/ValidarDatos';
import '../index.css';
import './login.css';
import Footer from '../nucleo/Footer';

//todo el codigo de api se va a lozalizar en el ../autentificacion/index.js
import {signUp} from '../autentificacion'; 



const SignUp = () => {


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
        sPermisos: "",
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
} = values


/**Ying
 *funciona que retorna otra funcion
 * cada vez que se cambia algo de los input, 
 * se va a guardar en esta funcion y ser guardado en el state
 * 
 * ...values --> unirlo con los valores anteriores como ... del arreglo
 *  error: false --> en caso que el usuario escriba algo y lo deja de escribir, para ocultar ese error
 * [name]: event.target.value --> lo que sea que ingrese el usuario en el input, puede ser nombre, email, etc.
 * una vez guardados estos valores en el state solo se manda al backend
 */ 
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
        //esta todo bien con el valor
        setValues({...values,error: false, [campo]: event.target.value});
   }else{
        //oops
        setValues({...values,error:resultado.incidente, [campo]: event.target.value});
   }


}


    const crearCuenta = (event) => {
        //la pagina no se recargue en el click en el boton
        event.preventDefault(); 
        setValues({...values, error:false});
        //una vez se hace el click, se realiza esta funcion
        //esta funcion esta localizado en ../autentificacion/index.js

    const resultado=checkingCliente({sNombre, sApellido, sContrasena, sCorreo, 
        dNacimiento, aFavoritos, oDireccion, bActivo,aRecetas})
        
    if (resultado.valido&&password===sContrasena) {
        signUp({sNombre, sApellido, sContrasena, sCorreo, 
            dNacimiento, aFavoritos, oDireccion, bActivo,aRecetas})
        //funcion para comprobar si se crea la cuenta con exito
        .then(data =>{

            
            //si hay error
            if('error' in data ){
                setValues({...values, error:data.error.message, funciona: false});
                console.log(data.error.message);
                console.log("Usuario Creados"+values);   
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

    

    

     /** Ying
      *      funcion para mostrar error
      * error ? '' : 'none' --> si el error del state tiene algo, 
      * se muestra el error, si no, display: none   
      *   si usa () en vez de {} no hay que poner return();
      */
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

    const direccionForm = () => (
        <form>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Provincia *
                </label>
                <input name="dProvincia" onChange={handleChange('dProvincia')}  type="text" 
                    className="form-control" value={dProvincia}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Cantón *
                </label>
                <input name="dCanton" onChange={handleChange('dCanton')}  type="text" 
                    className="form-control" value={dCanton}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Dirección 1 *
                </label>
                <input name="dDireccion1" onChange={handleChange('dDireccion1')}  type="text" 
                    className="form-control" value={dDireccion1}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Dirección 2 *
                </label>
                <input name="dDireccion2" onChange={handleChange('dDireccion2')}  type="text" 
                    className="form-control" value={dDireccion2}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Código Postal *
                </label>
                <input name="dCodPostal" onChange={handleChange('dCodPostal')}  type="text" 
                    className="form-control" value={dCodPostal}/>
            </div>
            <div className="form-group mt-30">
                <label className="text-muted">
                    Teléfono *
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

            

            <div className="btnCentral">
            <button   onClick={crearCuenta}   className="btn btn-outline-primary btnCentral">
                Crear Cuenta
            </button>
            </div>
            
        </form>
    );

    return (
        <div className="contenido">
            <Menu />
            <div className="container col-md-8 offset-md-2 mt-5 pt-5">
                <img src={candado} className="rounded mx-auto d-block img-fluid mt-5 mt-11" alt="..."
                height="100" width="100" />

                <div className="espacioV .mt-11">
                    {mostrarFunciona()}
                    {mostrarError()}
                    {signUpForm()}
                    
                </div>

                
            </div>

            <Footer />
        </div>   
    );    
}


export default SignUp;
/*     <script>
             if (document.getElementById("pass1").value==document.getElementById("pass2").value) {
                document.getElementById("Button").disabled = false
             }
                 
            </script> */