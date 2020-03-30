import React, { Fragment,useState,useEffect } from 'react';
import Layout from '../nucleo/Layout';
import {isAutentificacion} from '../autentificacion';
import {Link} from 'react-router-dom';
import '../index.css';  
import '../css.css';
import RecetaInterfaz from './RecetaInterfaz';
import moment from 'moment';
import {errorTranslator,getObjeto} from './../admin/apiAdmin'; 

const Perfil = () => {

    const {_id, sNombre, sApellido,sCorreo,dNacimiento} = isAutentificacion().cliente;
    const fechaNacimiento =moment(dNacimiento).format('DD/MM/YYYY'); 
    const [receta, setReceta] = useState([]);
    const [error, setError] = useState(false);

    const cargarReceta = () => {
      

        getObjeto('Cliente','/cursos/'+_id)
        .then((data={error:{message:'hay un problema, intente más tarde'}})=>{
            
                if ('error' in data) {

                    setError(errorTranslator(data.error.message))        
                    
                }else{
          
                    setReceta(data.value);
                    console.log(data);
                                                             
                }
       
        })
    }

    useEffect(()=>{
        cargarReceta()
    }, []);
   
    
    const linkUsuario = () => {
        return(
         

        <div className="row d-flex justify-content-center">
            <div class="col-3">
                <Link className="nav-link" to="/perfil/modificar">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/14/14853.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Modificar Perfil</h3>
                </div>
                </div>
                </Link>
            </div>
             
            <div class="col-3">              
                <Link className="nav-link" to="/producto">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/1/1375.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Productos</h3>
                </div>
                </div>
                </Link>
            </div>
            <div class="col-3">              
                <Link className="nav-link" to="/receta">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/53/53031.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Recetas</h3>
                </div>
                </div>
                </Link>
            </div>
            <div class="col-3">              
                <Link className="nav-link" to="/cart">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/107/107831.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Carrito de Compras</h3>
                </div>
                </div>
                </Link>
            </div>
        </div>

        );
    };

    const datosPersonales = () => {
        {/* info del cliente */}
        return(
            <div className="card perfilCard mb-5">
                <h3 className="card-header perfilCardHeader">
                    Mi Cuenta
                </h3>
                <ul className="list-group">
                    <li className="list-group-item text-capitalize"><strong>Nombre: </strong>{sNombre}</li>
                    <li className="list-group-item text-capitalize"><strong>Apellido: </strong>{sApellido}</li>
                    <li className="list-group-item"><strong>Email: </strong>{sCorreo}</li>
                    <li className="list-group-item"><strong>Fecha de Nacimiento: </strong>{fechaNacimiento}</li>
                </ul>
            </div>
        );
    }

    const historialCompra = () => {
        return(
           
            <div className="card mb-5">
                <h3 className="card-header">
                    Historial de Compra
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">Historial</li>
                    
                </ul>
            </div>
        );
    }

    const RecetasCompradas = () => {
        //`?filter={"where":{"sNombre":  {"regexp": "/${query}/i"}}}`
        return(
           
            <div className="card mb-5">
                <h3 className="card-header">
                    Recetas de Compradas
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">Recetas</li>
                    {receta.map((receta, i)=>(
                        <RecetaInterfaz key={i} receta={receta}/>
                    ))} 
                </ul>
            </div>
        );
    }
    

    return (
        <Layout jumbotron="jumbotronMovimiento"
        image="https://wallroom.io/img/2560x1440/bg-e4f1f74.jpg"
        titulo="Perfil" 
        descripcion={`${sNombre} ${sApellido}`} 
        className="container-fluid mt-5">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
                {/* los links de los usuarios */}
               

                <div className="col-lg-3 col-md-12">
                    {datosPersonales()}
                    {/* {historialCompra()} */}
                </div>

                <div className="col-lg-9 col-md-12">
                    {linkUsuario()}
                </div>

                <div className="col-lg-9 col-md-12">
                    {RecetasCompradas()}
                </div>
            </div>

            
        </Layout>
    );

}

export default Perfil;