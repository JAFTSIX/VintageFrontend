import React, {useState} from 'react';
import Layout from '../nucleo/Layout';
import Menu from '../nucleo/Menu';
import candado from './Img/candado.jpg';
import {Redirect} from 'react-router-dom';
//todo el codigo de api se va a lozalizar en el ../autentificacion/index.js
import {signIn, autentificacion, isAutentificacion} from '../autentificacion'; 



const SignIn = () => {
    //las variables del useState tienen que ser iguales a las del API
    const [values, setValues] = useState({
        //todo se elimina, solo se deja correo y contra
        sNombre: "",
        sApellido: "",
        sContrasena: "",
        sCorreo: "",
        dNacimiento: "",
        aRecetas: [],
        aFavoritos: [],
        aRecetas: [],
        oDireccion: {},
        bActivo: true,
        sPermisos: "1",
        sDireccion: "string"
            });


    //destruve el signUp State
    //para ser declarado como nombre en vez de SignUp.values.nombre
    const {sContrasena, sCorreo, 
        loading, error, redirecionar , dNacimiento, sPermisos, sNombre, sApellido,aRecetas,aFavoritos,sDireccion,
        oDireccion, bActivo} = values
    
    //distructive the los datos del local storage
    const {_id} = isAutentificacion();
    //funciona que returna otra funcion
    /*cada vez que se cambia algo de los input, 
    se va a guardar en esta funcion y ser guardado en el state*/
    const handleChange = sNombre => event => {
        //...values --> unirlo con los valores anteriores como ... del arreglo
        // error: false --> en caso que el usuario escriba algo y lo deja de escribir, para ocultar ese error
        //[name]: event.target.value --> lo que sea que ingrese el usuario en el input, puede ser nombre, email, etc.
        //una vez guardados estos valores en el state solo se manda al backend
        setValues({...values, error: false, [sNombre]: event.target.value});
    }

    /*
    esto es lo mismo de arriba
    function handleChange(name) {
        return function(event) {
            setValues({ ...values, error: false, [name]: event.target.value });
        };
    }*/


    const iniciarSession = (event) => {
        //la pagina no se recargue en el click en el boton
        event.preventDefault(); 
        setValues({...values, error:false, loading:true});
        
        
        signIn({sContrasena, sCorreo})
        //funcion para comprobar si se crea la cuenta con exito
        .then(data =>{
            //si hay error
            if(data.error){
                setValues({...values, error: data.error, loading: false});
            }//si no hay error, se redirecciona a la principal
            else {
                autentificacion(data, ()=>{
                    setValues({
                        ...values,
                        redireccionarUsuario: true
                    });
                });
            }
        });
    }

    

    
    /**Ying
     * funcion para mostrar error
     * error ? '' : 'none' --> si el error del state tiene algo, 
     * se muestra el error, si no, display: none
     *  si usa () en vez de {} no hay que poner return();
     */
    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );
        
    

    const mostrarFunciona = () => (
        loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)
    );
    
    //funciona redirecciona el usuario a la principal
    const redireccionarUsuario = () => {
            if(_id && sPermisos==='1'){
                return <Redirect to="/Admin"></Redirect>
            }else if (_id){
                return <Redirect to="/"></Redirect>
            }
    }


    //JSON.stringify(values) --> ver los var en string mostrado en pantalla
    //sirve para debug
    const signUpForm = () =>(
        <form>

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


            <div className="btnCentral">
            <button  onClick={iniciarSession} className="btn btn-outline-primary btnCentral">
                Iniciar Session.
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
                    {redireccionarUsuario()}
                </div>

                
            </div>
        </div>   
    );    
}


export default SignIn;