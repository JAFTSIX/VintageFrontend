import React, {useState} from 'react';
import Layout from '../nucleo/Layout';
import Menu from '../nucleo/Menu';
import candado from './Img/candado.jpg';
import {Link} from 'react-router-dom';
//todo el codigo de api se va a lozalizar en el ../autentificacion/index.js
import {signUp} from '../autentificacion'; 



const SignUp = () => {
    //las variables del useState tienen que ser iguales a las del API
    const [values, setValues] = useState({
        sNombre: "",
        sApellido: "",
        sContrasena: "",
        sCorreo: "",
        dNacimiento: "2020-02-16T21:57:37.497Z",
        aFavoritos: [
        ],
        aRecetas: [
          ],
        oDireccion: {},
        bActivo: true,
        sPermisos: "",
        error : '', 
        funciona : false,
        });
            


    //destruve el signUp State
    //para ser declarado como nombre en vez de SignUp.values.nombre
    const {sNombre, sApellido, sContrasena, sCorreo, 
        dNacimiento,sPermisos, error, funciona, aFavoritos, oDireccion, bActivo,aRecetas} = values

    //funciona que retorna otra funcion
    /*cada vez que se cambia algo de los input, 
    se va a guardar en esta funcion y ser guardado en el state*/
    const handleChange = sNombre => event => {
        //...values --> unirlo con los valores anteriores como ... del arreglo
        // error: false --> en caso que el usuario escriba algo y lo deja de escribir, para ocultar ese error
        //[name]: event.target.value --> lo que sea que ingrese el usuario en el input, puede ser nombre, email, etc.
        //una vez guardados estos valores en el state solo se manda al backend
        setValues({...values, error: false, [sNombre]: event.target.value});
    }

    const crearCuenta = (event) => {
        //la pagina no se recargue en el click en el boton
        event.preventDefault(); 
        setValues({...values, error:false});
        //una vez se hace el click, se realiza esta funcion
        //esta funcion esta localizado en ../autentificacion/index.js
        signUp({sNombre, sApellido, sContrasena, sCorreo, 
            dNacimiento, aFavoritos, oDireccion, bActivo,aRecetas})
        //funcion para comprobar si se crea la cuenta con exito
        .then(data =>{
            //si hay error
            if(data.error){
                setValues({...values, error: data.error, funciona: false});
            }//si no hay error, se vacia los textbox
            else {
                setValues({
                    ...values,
                    sNombre: '',
                    sApellido: '',
                    sContrasena: '',
                    sCorreo: '',
                    dNacimiento: '',
                    error: '',
                    funciona: true
                });
            }
        });
    }

    

    //funcion para mostrar error
    /*error ? '' : 'none' --> si el error del state tiene algo, 
    se muestra el error, si no, display: none*/
    //si usa () en vez de {} no hay que poner return();
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
                <input onChange={handleChange('sNombre')} type="text" className="form-control" 
                value={sNombre}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Primer Apellido
                </label>
                <input onChange={handleChange('sApellido')}  type="text" 
                className="form-control" value={sApellido}/>
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Fecha de nacimiento
                </label>
                <input onChange={handleChange('dNacimiento')}  type="text" 
                className="form-control" value={dNacimiento}/>
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Email
                </label>
                <input onChange={handleChange('sCorreo')}  type="email" 
                value={sCorreo} className="form-control" />
            
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Contraseña
                </label>
                <input onChange={handleChange('sContrasena')}  type="password" 
                value={sContrasena} className="form-control" />
        
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Confirmar Contraseña
                </label>
                <input onChange={handleChange('password')}  type="password" className="form-control" />
            </div>

            <div className="btnCentral">
            <button  onClick={crearCuenta} className="btn btn-outline-primary btnCentral">
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