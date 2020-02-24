import React, {useState} from 'react';
import Layout from '../nucleo/Layout';
import Menu from '../nucleo/Menu';
import candado from './Img/candado.jpg';
import {Link} from 'react-router-dom';
import {resultado,HandleChangeValidation,checking } from './procesos/Validar_Usuario';

//todo el codigo de api se va a lozalizar en el ../autentificacion/index.js
import {signUp} from '../autentificacion'; 

const regexsNombre_Apellido = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,60}$/

/*La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
NO puede tener otros símbolos. */
const regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

const regexsCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

const SignUp = () => {
    //las variables del useState tienen que ser iguales a las del API
    const [values, setValues] = useState({
        sNombre: "",
        sApellido: "",
        sContrasena: "",
        password: "",
        sCorreo: "",
        dNacimiento: "",
        aFavoritos: [],
        aRecetas: [],
        oDireccion: {},
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
const handleChange = sNombre => event => {

    event.preventDefault();
    const {
        name,
        value
    } = event.target;
    
   
   
   const resultado=HandleChangeValidation(name,value)
  
   if (resultado.valido) {
        //esta todo bien con el valor
        setValues({...values,error: false, [sNombre]: event.target.value});
   }else{
        //oops
        setValues({...values,error:resultado.incidente, [sNombre]: event.target.value});
   }

    

}


    const crearCuenta = (event) => {
        //la pagina no se recargue en el click en el boton
        event.preventDefault(); 
        setValues({...values, error:false});
        //una vez se hace el click, se realiza esta funcion
        //esta funcion esta localizado en ../autentificacion/index.js

    const resultado=checking({sNombre, sApellido, sContrasena, sCorreo, 
        dNacimiento, aFavoritos, oDireccion, bActivo,aRecetas})
    if (resultado.valido&&password===sContrasena) {
        signUp({sNombre, sApellido, sContrasena, sCorreo, 
            dNacimiento, aFavoritos, oDireccion, bActivo,aRecetas})
        //funcion para comprobar si se crea la cuenta con exito
        .then(data =>{

            console.log(data);
            //si hay error
            if('error' in data ){
                setValues({...values, error:data.error.message, funciona: false});
                console.log(data.error.message)
            }//si no hay error, se vacia los textbox
            else {
                setValues({
                    ...values,
                    sNombre: '',
                    sApellido: '',
                    sContrasena: '',
                    sCorreo: '',
                    dNacimiento: '',
                    error: false,                
                    funciona: true
                });
            }
        });
    } else {
       //oops
       setValues({...values,error:''.concat(resultado.incidente,' , Por favor llene correctamente todo el formulario antes de enviar'), [sNombre]: event.target.value});
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

    


    //JSON.stringify(values) --> ver los var en string mostrado en pantalla
    //sirve para debug
    const signUpForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-muted">
                    Nombre
                </label>
                <input name="sNombre" onChange={handleChange('sNombre')} type="text" className="form-control" 
                value={sNombre}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Primer Apellido
                </label>
                <input name="sApellido" onChange={handleChange('sApellido')}  type="text" 
                className="form-control" value={sApellido}/>
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Fecha de nacimiento
                </label>
                <input name="dNacimiento" onChange={handleChange('dNacimiento')}  type="date" 
                className="form-control"
                 value={dNacimiento }/>
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Email
                </label>
                <input name="sCorreo" onChange={handleChange('sCorreo')}  type="email" 
                value={sCorreo} className="form-control" />
            
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Contraseña
                </label>
                <input name="sContrasena" onChange={handleChange('sContrasena')}  type="password" 
                value={sContrasena} className="form-control" />
        
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Confirmar Contraseña
                </label>
                <input name="password" value={password}  onChange={handleChange('password')}  type="password" className="form-control" />
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
            <div className="container col-md-8 offset-md-2">
                <img src={candado} className="rounded mx-auto d-block img-fluid" alt="..."
                height="100" width="100" />

                <div className="espacioV">
                    {mostrarFunciona()}
                    {mostrarError()}
                    {signUpForm()}
                    
                </div>

                
            </div>
        </div>   
    );    
}


export default SignUp;
/*     <script>
             if (document.getElementById("pass1").value==document.getElementById("pass2").value) {
                document.getElementById("Button").disabled = false
             }
                 
            </script> */