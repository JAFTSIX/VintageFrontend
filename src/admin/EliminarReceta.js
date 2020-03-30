import React, {useState, useEffect} from 'react';
import Layout from '../nucleo/Layout';
import {eliminarReceta} from './apiAdmin';
import {Redirect} from 'react-router-dom';
import '../index.css'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const EliminarReceta= (props) => {
    const [valor, setValor] = useState({          
        recetaEliminado:"",
        redirect:false,
    });

    const {recetaEliminado, redirect} = valor;

    // controllar el seguro que desea eliminar? 
    const [open, setOpen] = React.useState(true);

    const handleClose= seguir=>_evento => {
        console.log(seguir)      
        if(seguir){
            eliminar(props.match.params.recetaId)
        }else{
            setValor({redirect:true})       
        }
        setOpen(false);
    };

    // llamar al api en admin api 
    const eliminar = recetaId => {
        eliminarReceta(recetaId)
        .then(data=>{
            
            setValor({
                redirect:true,
                //recetaEliminado:data.sNombre
            })
            
        })
    }

    useEffect(()=>{
        const recetaId = props.match.params.recetaId
        console.log(recetaEliminado)
        // eliminar(recetaId)
        
    }, []);

    const redireccionarUsuario = () => {
        if(redirect){
            return <Redirect to="/receta"></Redirect>
        }
            
    }


    return (
        <div className="row">

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
    
            <DialogTitle id="alert-dialog-title">{`Eliminar ${recetaEliminado}`}</DialogTitle>
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

export default EliminarReceta;
