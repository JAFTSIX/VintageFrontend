import React, {useState} from 'react';
import Layout from '../nucleo/Layout';
import Menu from '../nucleo/Menu';
import { Link, Redirect} from 'react-router-dom';
import '../index.css';
import './login.css';
import Footer from '../nucleo/Footer';
import candado from './Img/candado.jpg';


const Password = () => {
    const passwordForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-muted">
                    Email
                </label>
                <input  type="email" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">
                    Contraseña
                </label>
                <input  type="password" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">
                    Confirmar Contraseña
                </label>
                <input  type="password" className="form-control" />
            </div>


            <div className="btnCentral">      
                <button className="btn btn-outline-primary">
                    Cambiar Contraseña
                </button>
            </div>
        </form>
    );
    return (
        <div className="contenido">
            <Menu />
            <div className="container col-md-8 offset-md-2 mt-10">
                <img src={candado} className="rounded mx-auto d-block img-fluid mt-10" alt="..."
                height="100" width="100" />
                {passwordForm()}
            </div>
            <Footer />
        </div>   
    );  
}
export default Password;