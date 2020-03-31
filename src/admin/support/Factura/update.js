import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import {getObjetonyId,modificarObjeto ,errorTranslator} from '../../apiAdmin';
import {Redirect} from 'react-router-dom';
import '../../../index.css'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { Checkbox } from 'react-input-checkbox';
import '../support.css';
import { Link } from 'react-router-dom';

import {checkingFactura} from '../../../user/procesos/ValidarDatos';

const ModificarFactura = (props) => {
    const [valor, setValor] = useState({
         
        sCliente: "",
        dFecha: new Date(),
        aCompras: [],
        iSubtotal: 0,
        iTotal: 12714,
        oDireccion: {
            sCiudad: "",
            sDireccion1: "",
            sDireccion2: "",
            iCodPostal: "",
            sTelefono: "",
            sNombre: "",
            sApellido: ""
        },

        
        redirect:false,
        loading: false,
        error : "",
        
        FacturaModificado:false,
    });

    
 
    

    //destruture
    const {
     
        sCliente,
        dFecha,
        aCompras,
        iSubtotal,
        iTotal,
        oDireccion,
        loading,
        error,
        FacturaModificado,
        redirect,
       
       
    } = valor;

  
   
    const cargarFactura = _Id => {

        getObjetonyId('Factura',_Id)
        .then(data=>{

            if (data === undefined) {
                setValor({
                  ...valor,
                  error:'Problemas, intente más tarde'
                });
              } else {

                if('error' in data){
                    setValor({...valor, error:errorTranslator(data.error.message)})
                }else{
                    
                    setValor({
    
                        ...valor,
                         ...data,             
                         dFecha: moment(data.dFecha).toDate(),
                        loading: false,
                    })
                }
              }
            
        })
    }

    useEffect(()=>{
        const _Id = props.match.params._Id
        //console.log(_Id)
        cargarFactura(_Id)
        
    }, []);
    
    


 
    const handleChange =nombre => event => {
    
     if (nombre==='dFecha') {
        setValor({...valor, [nombre]: event});    
     } else if (nombre==='iTotal'){
        setValor({...valor, [nombre]: parseInt(event.target.value)});    

        
     }else if (nombre==='iSubtotal'){
        setValor({...valor, [nombre]: parseInt(event.target.value)});    

        
     }else {
        setValor({...valor, [nombre]: event.target.value});    
     }


  
     console.log(valor)
    }



    const handleArrayChange =(nombre,i) => event => {
    
 
        if (nombre==='sNombre') {
            aCompras[i].sNombre =event.target.value 
           setValor({...valor, aCompras:aCompras });    
        } else if (nombre==='iPrecio'){
            aCompras[i].iPrecio =parseInt( event.target.value) 
            setValor({...valor, aCompras:aCompras });      
        }else if(nombre==='iCant'){
            aCompras[i].iCant =parseInt( event.target.value) 
            setValor({...valor, aCompras:aCompras });      
        } else if(nombre==='borrar'){
             
            var articulosValidos=[]; 
            for (let index = 0; index < aCompras.length; index++) {
                if (index!==i) {
                    articulosValidos.push(aCompras[i])
                } 
                
            }
            setValor({...valor, aCompras:articulosValidos });      
        }
   
   
        console.log(valor)
       }

       const handleDireccionChange =nombre => event => {
    
        if(nombre==='sCiudad'){
            oDireccion.sCiudad   =event.target.value
        }else{
        oDireccion[nombre]= event.target.value
        
        }
        setValor({...valor,oDireccion: oDireccion});    
      
   
   
        
       }


    
    const clickSubmit =(event)=>{
        event.preventDefault();
    const resultado=checkingFactura({
        _id:props.match.params._Id    ,
        sCliente,
        dFecha,
        aCompras,
        iSubtotal,
        iTotal,
        oDireccion
    })
     
    if (resultado.valido) {

        //console.log(valor)
        setValor({...valor, error:'', loading:true});

        
        console.log(typeof aCompras)
        console.log( aCompras)
        modificarObjeto ('Factura',{
            _id:props.match.params._Id    ,
            sCliente,
            dFecha,
            aCompras,
            iSubtotal,
            iTotal,
            oDireccion
        })
        .then(data=>{

            console.log(data)
           if (data===undefined) {
            setValor({...valor, error:errorTranslator('Problemas, intente más tarde')})
           } else {
               
            if('error' in data){
                setValor({...valor, error:errorTranslator(data.error.message)})
            }else{
                
                setValor({...valor,
                    FacturaModificado: true,
                    redirect:true
                })       
            }           }


                
        })
        
    } else {
       setValor({...valor, error:resultado.incidente})
        
        
    }
     
       
    }


    const agregarFacturaForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
        <Link to={`/Factura/Support/`}>
                <button className="btn btn-outline-primary mb-5">
                    Regresar a Factura
                </button>
        </Link>

        <div className="form-group">
        <label className="text-muted">Id Cliente</label>
        <input onChange={handleChange('sCliente')} 
                type="text" 
                className="form-control" 
                required
                value={sCliente} />
        </div>
     

            <div className="form-group">
                <label className="text-muted mr-3">Fecha </label>
                
                <DateTimePicker
                        onChange={handleChange('dFecha')}
                        value={dFecha}
                        
                      />
            </div>

           
        <div className="form-group">
                <label className="text-muted">Sub Total  </label>
                <input onChange={handleChange('iSubtotal')} 
                        type="number" 
                        className="form-control" 
                        required
                        value={iSubtotal } />
            </div>

            <div className="form-group">
                <label className="text-muted">Total  </label>
                <input onChange={handleChange('iTotal')} 
                        type="number" 
                        min="1"
                        className="form-control" 
                        required
                        value={iTotal } />
            </div>

            <div  className="form-group">
            <p>
            <a className=""   data-toggle="collapse" href={'#direccion'} role="button" aria-expanded="false" aria-controls="collapseExample">   
            <h5 className="font-weight-bold text-dark" style={{display : 'inline'}}>Dirección ▼</h5>  
            </a>
          </p>

      
              <div className="collapse" id={'direccion'}>
     
        
              
            <div className="form-group">
            <label className="text-muted">Ciudad  </label>
            <input onChange={handleDireccionChange('sCiudad')} 
                    type="text" 
                    className="form-control" 
                    required
                    value={oDireccion.sCiudad}/>
            </div>
              
              
              
              

              <div className="form-group">
            <label className="text-muted">Dirección 1  </label>
            <input onChange={handleDireccionChange('sDireccion1')} 
                    type="text" 
                    className="form-control" 
                    required
                    value={oDireccion.sDireccion1} />
            </div>
              
              

              <div className="form-group">
              <label className="text-muted">Dirección 2  </label>
              <input onChange={handleDireccionChange('sDireccion2')} 
                      type="text" 
                      className="form-control" 
                      required
                      value={oDireccion.sDireccion2} />
              </div>



              <div className="form-group">
              <label className="text-muted">Código postal</label>
              <input onChange={handleDireccionChange('iCodPostal')} 
                      type="text" 
                      className="form-control" 
                      required
                      value={oDireccion.iCodPostal} />
              </div>

              <div className="form-group">
              <label className="text-muted">Teléfono</label>
              <input onChange={handleDireccionChange('sTelefono')} 
                      type="text" 
                      className="form-control" 
                      required
                      value={oDireccion.sTelefono} />
              </div>


              <div className="form-group">
              <label className="text-muted">Nombre</label>
              <input onChange={handleDireccionChange('sNombre')} 
                      type="text" 
                      className="form-control" 
                      required
                      value={oDireccion.sNombre} />
              </div>

              

              <div className="form-group">
              <label className="text-muted">Apellido</label>
              <input onChange={handleDireccionChange('sApellido')} 
                      type="text" 
                      className="form-control" 
                      required
                      value={oDireccion.sApellido} />
              </div>
                             
              </div>
          </div>


          <div  className="form-group">
          <p>
          <a className=""   data-toggle="collapse" href={'#compras'} role="button" aria-expanded="false" aria-controls="collapseExample">   
          <h5 className="font-weight-bold text-dark" style={{display : 'inline'}}>Articulos Comprados ▼</h5>  
          </a>
        </p>

    
            <div className="collapse" id={'compras'}>
   
            {aCompras.map((item, key) =>
            <div className="border border-dark p-1 mb-4">
            
            
            <button type="button" onClick={handleArrayChange('borrar', key)} class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

            <div className="form-group">
            <label className="text-muted">Producto  </label>
            <input onChange={handleArrayChange('sNombre', key)} 
                    type="text" 
                    className="form-control" 
                    required
                    value={item.sNombre} />
           </div>


           
          { item.iCant!==undefined && (
              
           <div className="form-group">
           <label className="text-muted">Cantidad  </label>
           <input onChange={handleArrayChange('iCant', key)} 
                   type="number" 
                   className="form-control" 
                   min="1"
                   required
                   value={item.iCant} />
          </div>
          )}

          

            <div className="form-group">
            <label className="text-muted">Precio  </label>
            <input onChange={handleArrayChange('iPrecio', key)} 
                    type="number" 
                    className="form-control" 
                    min="1"
                    required
                    value={item.iPrecio} />
           </div>    
        
           
            
            
            </div>
                


            )}  
                           
            </div>
        </div>


            <button className="btn btn-outline-primary">
                Modificar Factura
            </button>
        </form>
    );

    const mostrarError = () => (
        <div className="alert alert-danger" 
        style={{display: error ? '':'none'}}>
            {error}
        </div>
    );
    const mostrarFunciona = () => (
        <div className="alert alert-info" 
        style={{display: FacturaModificado ? '':'none'}}>
            <h4>{`el registro se ha modificado exitosamente `}</h4>
        </div>
    );
    const mostrarLoading = () => (
        loading && (<div className="alert alert-success">
            <h2>Cargando...</h2>
        </div>)
    );

    const redireccionarUsuario = () => {
        if(redirect){
            return <Redirect to="/Factura/Support/"></Redirect>
        }
            
    }
    

    return (
        <Layout titulo="MODIFICAR Factura" 
        descripcion="" 
        jumbotron="jumboEstatico"
        image="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-0/p640x640/69256191_3073905745969718_1245858966190161920_o.jpg?_nc_cat=102&_nc_sid=dd9801&_nc_ohc=q8Os9gW-GQUAX-YXekH&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=6&oh=7922a207e33de43ba516c12034b7b880&oe=5EA5AAFE"
        className="container-fluid">
 
            
            <div className="row">
 
                <div className="col-md-8 offset-md-2">                
                    {mostrarLoading()}
                    {mostrarError()}
                    {mostrarFunciona()}                  
                    {agregarFacturaForm()}
                    {redireccionarUsuario()}
                    
                </div>
            </div>

            
        </Layout>
    );
}

export default ModificarFactura;