import React, { Fragment,useEffect,useState } from 'react';
import Layout from '../nucleo/Layout';
import {isAutentificacion} from '../autentificacion';
import {Link} from 'react-router-dom';
import '../index.css';
import '../css.css';
import moment from 'moment';
import {errorTranslator,getObjeto} from './../admin/apiAdmin'; 
import RecetaInterfaz from './RecetaInterfaz';
const AdminD = () => {

    const {_id, sNombre, sApellido,sCorreo, dNacimiento} = isAutentificacion().cliente;
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
   
    
    const linkAdmin = () => {
        return(
            <Fragment>
        <div className="row d-flex justify-content-center">
            <div class="col-lg-3 col-md-4 col-sm-12">
                <Link className="nav-link" to="/perfil/modificar">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/14/14853.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Modificar Perfil</h3>
                </div>
                </div>
                </Link>
            </div>
             
            <div class="col-lg-3 col-md-4 col-sm-12">              
                <Link className="nav-link" to="/producto">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/1/1375.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Productos</h3>
                </div>
                </div>
                </Link>
            </div>  
            <div class="col-lg-3 col-md-4 col-sm-12">              
                <Link className="nav-link" to="/producto/agregar">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/15/15417.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Agregar Productos</h3>
                </div>
                </div>
                </Link>
            </div>  
               
        </div>
        <div className="row d-flex justify-content-center">
            <div class="col-lg-3 col-md-4 col-sm-12">              
                <Link className="nav-link" to="/receta">
                <div class="card f-flex justify-content-center">  
                <img class="card-img-top perfilCardImg" src="https://pngimage.net/wp-content/uploads/2018/06/pastel-icon-png-2.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Recetas</h3>
                </div>
                </div>
                </Link>
            </div>   
            <div class="col-lg-3 col-md-4 col-sm-12">              
                <Link className="nav-link" to="/receta/agregar">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/573/premium/573627.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Agregar Recetas</h3>
                </div>
                </div>
                </Link>
            </div>  
            <div class="col-lg-3 col-md-4 col-sm-12">              
                <Link className="nav-link" to="/categoria/Support/">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/1077/1077340.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Categoria</h3>
                </div>
                </div>
                </Link>
            </div> 
            <div class="col-lg-3 col-md-4 col-sm-12">              
                <Link className="nav-link" to="/categoria/Support/agregar">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/24/24141.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Agregar Categoria</h3>
                </div>
                </div>
                </Link>
            </div> 
        </div>
        <div className="row d-flex justify-content-center">
            <div class="col-lg-3 col-md-4 col-sm-12">              
                <Link className="nav-link" to="/Factura/Support/">    
                <div class="card d-flex justify-content-center">  
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/591/591796.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Factura</h3>
                </div>
                </div>
                </Link>
            </div>   
            <div class="col-lg-3 col-md-4 col-sm-12">              
                <Link className="nav-link" to="/Historial/Support/">
                <div class="card">
                <img class="card-img-top perfilCardImg" src="https://image.flaticon.com/icons/png/512/32/32284.png" alt="Card image cap" />
                <div class="card-body mt-3">
                    <h3 class="card-title text-center text-dark">Ver Historial</h3>
                </div>
                </div>
                </Link>
            </div>  
        </div>
        </Fragment>

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
        <Layout jumbotron="jumbotronMovimiento" titulo="Perfil Administrador" 
        image="https://wallroom.io/img/2560x1440/bg-e4f1f74.jpg"
        descripcion={`${sNombre} ${sApellido}`} 
        className="container-fluid mt-5">
            {/* <img src="..." class="img-fluid" alt="Responsive image"></img> */}
            
            <div className="row">
                {/* los links de los usuarios */}
                
                <div className="col-lg-3 col-md-12">
                    {datosPersonales()}
                </div>

                <div className="col-lg-9 col-md-12">
                    {linkAdmin()}
                </div>
                <div className="col-lg-9 col-md-12">
                    {RecetasCompradas()}
                </div>
            </div>

            
        </Layout>
    );

}

export default AdminD;