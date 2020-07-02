import React, {useState,useEffect} from 'react';
import Layout from '../nucleo/Layout';
import Menu from '../nucleo/Menu';
import { Link, Redirect} from 'react-router-dom';
import '../index.css';
import './login.css';
import Footer from '../nucleo/Footer';
import candado from './Img/candado.jpg';
import { recoverPass} from './../admin/apiAdmin';

const Password = (props) => {
    const regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    const token = props.match.params.token;
    const [values, setValues] = useState({
        pass1: "",
        pass2: "",
        error: false,
        Redirect:false
        })

    const handleChange = space => event =>         
       {
        console.log(token)
        if (values.pass1===values.pass2&& regexPassword.test(values.pass1)) { 
            setValues({...values, [space]: event.target.value,error:false});
        }else{
            setValues({...values, [space]: event.target.value});
        }
            
            console.log(values)
        }


    const changePass = (event) => {
        event.preventDefault(); 
    
    if (values.pass1===values.pass2&& regexPassword.test(values.pass1)) {
        ///Recuperar/token/{id}
        recoverPass('Recuperar/token/'+token,values.pass1)
        .then( (data={error:{message:'hay un problema, intente más tarde'}} ) =>{
            console.log(data);
            if('error' in data ){
                setValues({...values, error:data.error.message, Redirect: false});
            }else {
                setValues({...values, Redirect:true});
            }
        });
    } else {       
       setValues({...values,error:''.concat('Por favor llene correctamente todo el formulario antes de enviar'),  Redirect: false});
    }

    }

    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: values.error ? '' : 'none'}}>
            {values.error}
           
        </div>
        
    );

    const redireccionarUsuario = () => {
        if (values.Redirect){
             return <Redirect to="/"></Redirect>
         }
     
    }

    const passwordForm = () =>(
        <form>                
            <div className="form-group">
                <label className="text-muted">
                    Contraseña
                </label>
                <input  type="password" onChange={handleChange('pass1')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">
                    Confirmar Contraseña
                </label>
                <input  type="password" onChange={handleChange('pass2')} className="form-control" />
            </div>


            <div className="btnCentral">      
                <button  onClick={changePass} className="btn btn-outline-primary">
                    Cambiar Contraseña
                </button>
            </div>
        </form>
    );
    return (
        <div className="contenido">
            <Menu />
            {mostrarError()}
            <div className="container col-md-8 offset-md-2 mt-10">
                <img src={candado} className="rounded mx-auto d-block img-fluid mt-10" alt="..."
                height="100" width="100" />
                 {mostrarError()}
                {passwordForm()}
            
                {redireccionarUsuario()}
            </div>
            <Footer />
        </div>   
    );  
}
export default Password;