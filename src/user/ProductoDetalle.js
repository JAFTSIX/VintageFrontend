import React, {useState, useEffect, Fragment} from 'react';
import {leerProductoDetalle} from './apiProducto';
import '../index.css';
import '../css.css';
import './videoReceta.css';
import {isAutentificacion} from '../autentificacion/index';
import { Link } from 'react-router-dom';
import Menu from '../nucleo/Menu';
import EliminarProducto from '../admin/EliminarProducto';


const ProductoDetalle = (props) => {
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);

    // metodo cargar producto del url 
    const cargarDetalleProducto = productoId => {
        // funcion ubicado en apiProducto 
        leerProductoDetalle(productoId).then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setProducto(data);
            }
        })
    }

    //cargar todo apenas entre a la pagina y cada vez que se cambie el state
    useEffect(() => {
        //guardar el id de la producto del url
        const productoId = props.match.params.productoId;
        cargarDetalleProducto(productoId);
    }, []);

    return(
        
        <div className="mt10 mx-5 container-fluid ">
            <Menu />
            <h1 className="text-capitalize">{producto.sNombre}</h1>
            <h4 className="mb-5">Detalle de Producto</h4>

            {/* botones admin  */}
            <div className="btnAdminProducto">
            {isAutentificacion() 
            && isAutentificacion().cliente.bAdmin && (
                <Fragment>
                    
                    {/* // aqui se pasa el id del producto en el url para actualizar */}
                    <Link to={`/Articulo/${producto._id}/?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22_id%22%3A%20true%2C%0A%20%20%20%20%22sNombre%22%3A%20true%2C%0A%20%20%20%20%22aEtiqueta%22%3A%20true%2C%0A%20%20%20%20%22dFechaPublicacion%22%3A%20true%2C%0A%20%20%20%20%22sTexto%22%3A%20true%2C%0A%20%20%20%20%22iPrecio%22%3A%20true%2C%0A%20%20%20%20%22sUrlVideo%22%3A%20true%2C%0A%20%20%20%20%22sUrlImagen%22%3A%20true%2C%0A%20%20%20%20%22bActivo%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%5B%0A%20%20%20%20%22string%22%0A%20%20%5D%0A%7D`}>
                        <button className="btn btn-outline-primary 
                            agregarPadding mr-2">
                                Modificar Producto
                        </button>
                    </Link>

                    <Link to={`Eliminar/Articulo/${producto._id}`}>
                        {/* <EliminarProducto props={props.match.params.productoId}/> */}
                        <button className="btn btn-outline-primary
                            agregarPadding ml-2" data-toggle="modal" data-target="#exampleModal">
                                Eliminar Producto
                        </button>
                    
                    </Link>

                </Fragment>
            )}
                {/* btn regresar a producto general  */}
                <Link to={`/Producto`}>
                        <button className="btn btn-outline-primary
                            agregarPadding ml-3" data-toggle="modal" data-target="#exampleModal">
                                Atras
                        </button>
                    
                </Link>
             </div>

            {/* contenido  */}
            <div className="row mt-1 Content">
                <div className="col-6 fix">     
                    <img className="video" src={producto.sUrlImagen} />
                </div>  
                <div className="col-5 scroll mr-1">   
                    <h1 className=" text-left colorPink">Descripcion</h1>  
                    <h5 className="mt-4 mb-4 text-justify">{producto.sDescripcion}</h5>
                    <h3 className="float-right">Precio: ₡ {producto.iPrecio}</h3>
                    <button className="btn btn-outline-primary">Añadir a Carrito de Compra</button>

                </div>             
            </div>
        </div>
    );
}

export default ProductoDetalle;   
