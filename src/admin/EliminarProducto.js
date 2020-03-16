import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import {eliminarProducto} from './apiAdmin';
import {Redirect} from 'react-router-dom';
import '../index.css';
import '../user/producto.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const EliminarProducto = (props) => {
    const [valor, setValor] = useState({          
        productoEliminado:"",
        redirect:false,
    });

    const {productoEliminado, redirect} = valor;

    const [open, setOpen] = React.useState(true);
    
    const handleClose= seguir=>_evento => {
        console.log(seguir)      
        if(seguir){
            eliminar(props.match.params.productId)
        }else{
            setValor({redirect:true})       
        }
        setOpen(false);
    };

    const eliminar = productId => {
        eliminarProducto(productId)
        .then(data=>{
            setValor({
                redirect:true,
                productoEliminado:data
            })
            
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId
        console.log(productId)
        // eliminar(productId)
        
    }, []);

    const redireccionarUsuario = () => {
        if(redirect){
            return <Redirect to="/producto"></Redirect>
        }
            
    }


    return (

            <div className="row">

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
    
            <DialogTitle id="alert-dialog-title">{`Eliminar`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               ¿Esta seguro que deseas eliminar este producto?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose(false)} color="primary">
                No
              </Button>
              <Button onClick={handleClose(true)} color="primary" autoFocus>
                Seguro
              </Button>
            </DialogActions>
          </Dialog> 

         
          {redireccionarUsuario()}
                             
            </div>

    );
}

export default EliminarProducto;
