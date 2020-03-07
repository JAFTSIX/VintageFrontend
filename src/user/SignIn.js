import React, {useState} from 'react';
import Layout from '../nucleo/Layout';
import Menu from '../nucleo/Menu';
import candado from './Img/candado.jpg';
import { Redirect} from 'react-router-dom';
//todo el codigo de api se va a lozalizar en el ../autentificacion/index.js
import {signIn, autentificacion, isAutentificacion} from '../autentificacion'; 
import {checkingLogin,HandleChangelogin } from './procesos/Validar_Usuario';
import '../index.css'


const SignIn = () => {
    //las variables del useState tienen que ser iguales a las del API
    const [values, setValues] = useState({
        //todo se elimina, solo se deja correo y contra
        
        sContrasena: "",
     
      
        
        bActivo:true ,
        bAdmin:false ,
      

        sCorreo: "",


        
        loading:false ,
        redireccionar:false,
        error:""
            });


    //destruve el signUp State
    //para ser declarado como nombre en vez de SignUp.values.nombre
    const {sContrasena, sCorreo, 
        loading, error,redireccionar, bAdmin} = values
    
    //distructive the los datos del local storage
    const {_id} = isAutentificacion();
 
    /** Jafet
     * esto es handlechange
     * function handleChange(campo) {
     * return function(event) {
     *    setValues({ ...values, error: false, [name]: event.target.value });
     *   };
     * @params sNombre
     */
    const handleChange = campo => event => {

        event.preventDefault();
        const {
            name,
            value
        } = event.target;
        
        const resultado=HandleChangelogin(name,value)
  
        if (resultado.valido) {
             //esta todo bien con el valor
             setValues({...values,error: false, [campo]: event.target.value});
        }else{
             //oops
             setValues({...values,error:resultado.incidente, [campo]: event.target.value});
        }
        
    }
 


    const iniciarSession = (event) => {
        //la pagina no se recargue en el click en el boton
        event.preventDefault(); 
        setValues({...values, error:false, loading:true});
        
        const resultado=checkingLogin({ sContrasena, sCorreo})
        if (resultado.valido) {
            signIn({sContrasena, sCorreo})
            //funcion para comprobar si se crea la cuenta con exito
            .then(data =>{
                //si hay error
                if('error' in data){
                    
                    setValues({...values, error: data.error.message, loading: false});
                }//si no hay error, se redirecciona a la principal
                else {


                     
                    autentificacion(data, ()=>{
                        setValues({
                            ...values,
                            redireccionar: true,
                            loading: false,
                            bAdmin:data.cliente.bAdmin
                        });
                    });
                }

            });    
        } else {
             //oops
       setValues({...values,error:''.concat(resultado.incidente,' , Por favor llene correctamente todo el formulario antes de enviar')});
            
        }
        
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
        
    

    const mostrarLoading = () => (
        loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)
    );
    
    //funciona redirecciona el usuario a la principal
    const redireccionarUsuario = () => {
           if (redireccionar){
         if( bAdmin){
                return <Redirect to="/Admin"></Redirect>
            }else {
                return <Redirect to="/"></Redirect>
            }
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
                    {mostrarLoading()}
                    {mostrarError()}
                    {signUpForm()}
                    {redireccionarUsuario()}
                </div>

                
            </div>
        </div>   
    );    
}


export default SignIn;