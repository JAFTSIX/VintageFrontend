import React, {useState, Fragment} from 'react';
import Layout from '../nucleo/Layout';
import {isAutentificacion} from '../autentificacion';
import {Link} from 'react-router-dom';

const AgregarCategoria = () => {
    const [valor, setValor] = useState({
        nombre: [
            "Ollas",
            "Mesas",
            "Vasos"
        ],
        newNombre:[
            ""
        ],
        error: false,
        funciona: false
    });

    //destruture info de local storage
     const {user, token} = isAutentificacion();
    const {nombre, error, funciona, newNombre} = valor;

    // const handleChange = nombre => event => {
    //     agregarCategoria(event.target.value);
    //     console.log(nombre);
    // }


    // const clickSubmit = (e) => {
    //     e.preventDefault(); 
    //     setValor({...valor,error: '', funciona: false});

    //     //hacer request al api para crear categoria

    //     //setValor({nombre: newNombre});
    //     console.log(newNombre);
        
    // }

    // const agregarCategoria = (e) =>{
    //     setValor({newNombre: nombre.push("1")});
        
    // }

    const nuevaCategoriaForm = () => (
        <form >

            <div className="container">
                <div className="form-group">
                    <label className="text-muetd">Nombre</label>
                    <input type="text" className="form-control"
                    //onChange={handleChange(nombre)}
                    autoFocus required/>
                 
                </div>

                <button className="btn btn-outline-primary widthCompleto">
                        Crear Categoria
                </button>
            </div>
            
        </form>
    );

    return (
        <Layout titulo="Categoria Productos" 
        descripcion="Agregar una nueva categoria para los productos">
        
            <div className="row">
                {/* los links de los usuarios */}
                
                <div className="col-md-8 offset-md-2">
                    {nuevaCategoriaForm()}
                </div>
            </div>

            
        </Layout>
    );

}

export default AgregarCategoria;