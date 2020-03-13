import React, {
    useState,
   
} from 'react';
import Layout from '../../../nucleo/Layout';

 
import {
    insertObject
} from '../../apiAdmin';
import '../../../index.css'

const AgregarFactura = () => {
        const [valor, setValor] = useState({
            nombre: "",
            nuevaFactura: "",
            error: false,
            funciona: false
        });



        const {
            nombre,
            error,
            funciona,
            nuevaFactura
        } = valor;

        const handleChange = campo => event => {
            event.preventDefault();

            setValor({
                ...valor,
                error: false,
                [campo]: event.target.value
            });

            console.log(nombre);
        }


        const clickSubmit = (e) => {
            e.preventDefault();
            setValor({
                ...valor,
                error: '',
                funciona: false
            });

            console.log(nombre);
            //hacer request al api para crear Factura
            insertObject('Facturas', {
                sNombre: nombre
            }).then(
                data => {

                    if (data === undefined) {
                        setValor({
                            ...valor,
                            error: 'Problemas, intente más tarde'
                        });
                    } else {
                        if ('error' in data) {
                            setValor({
                                ...valor,
                                error: data.error.message,
                                funciona: false
                            });

                        } else {

                            console.log(data)
                            setValor({
                                ...valor,
                                sNombre: '',
                                nuevaFactura: data.sNombre,
                                error: false,
                                funciona: true
                            });
                        }

                    }


                }

            )

            //setValor({nombre: newNombre});
            console.log(nombre);

        }

 


    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '' : 'none'}}>
            {error}
           
        </div>
        
    );
        
    

    const mostrarFunciona =  () => (
        <div className="alert alert-success" 
        style={{display: funciona ? '' : 'none'}}>
        Factura {nuevaFactura} creada exitosamente.
        </div>
    );

    const nuevaFacturaForm = () => (
        <form >

            <div className="container">
                <div className="form-group">
                    <label className="text-muetd">Nombre</label>
                    <input type="text" className="form-control"
                    onChange={handleChange('nombre')}
                    autoFocus required/>
                 
                 

                </div>

                <button className="btn btn-outline-primary widthCompleto" onClick={clickSubmit}>
                        Crear Factura
                </button>
            </div>
            
        </form>
    );

    return (
        <Layout titulo="Factura de Recetas" 
        descripcion="Agregar una nueva Factura para las recetas">
        
            <div className="row">
                {/* los links de los usuarios */}
                
                <div className="col-md-8 offset-md-2">
                
                {mostrarError()}    
                {mostrarFunciona()}
                {nuevaFacturaForm()}
                </div>
            </div>

            
        </Layout>
    );

}

export default AgregarFactura;