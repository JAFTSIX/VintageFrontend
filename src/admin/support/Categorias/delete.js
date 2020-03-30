import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import {eliminarObjeto,errorTranslator} from '../../apiAdmin';
import {Redirect} from 'react-router-dom';
import '../../../index.css'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const EliminarCategoria= (props) => {
    const [valor, setValor] = useState({          
        CategoriaEliminado:"",
        redirect:false,
        error:false
    });

    const [open, setOpen] = React.useState(true);
    
    const {error, redirect} = valor;


    

    const handleClose= seguir=>_evento => {
     

        
        console.log(seguir)
        
        if(seguir){

             

            eliminar(props.match.params._Id)

        }else{
          setValor({redirect:true})  
        }
        setOpen(false);
    };
    


    const eliminar = _Id => {

       /*AQUI */
    
       
        eliminarObjeto('Categoria',_Id)
        .then(data=>{
          if (data === undefined) {
            setValor({
              ...valor,
              error:'Problemas, intente más tarde'
            });
          } else{
            if ('error' in data) {
              setValor({...valor, error:errorTranslator(data.error.message) });
              
          } else{
  
            setValor({
              redirect:true
            })
          }
          }
         
          
            
        })
       
        
    }

    useEffect(()=>{

        /*AQUI */
        const _Id = props.match.params._Id
        console.log(_Id)
      //  eliminar(_Id)
        
    }, []);

    const redireccionarUsuario = () => {
        if(redirect){
            return <Redirect to="/categoria/Support/"></Redirect>
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
               ¿Esta seguro de la acción que está a punto de hacer?
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

export default EliminarCategoria;
