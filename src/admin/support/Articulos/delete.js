import React, {useState, useEffect} from 'react';
import Layout from '../../../nucleo/Layout';
import {eliminarObjeto} from '../../apiAdmin';
import {Redirect} from 'react-router-dom';
import '../../../index.css'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const EliminarFactura= (props) => {
    const [valor, setValor] = useState({          
        FacturaEliminado:"",
        redirect:false,
    });

    const [open, setOpen] = React.useState(true);
    const [seguro, setSeguro] = React.useState(false);
    const {FacturaEliminado, redirect} = valor;


    const handleClickOpen = () => {
      setOpen(true);
    };
  

    const handleClose= seguir=>_evento => {
     

        
        console.log(seguir)
        
        if(seguir){

             

            eliminar(props.match.params._Id)

        }else{
            
        }
        setOpen(false);
    };
    


    const eliminar = _Id => {

       /*AQUI */
       console.log('sdgasdga')

       
        eliminarObjeto('Factura',_Id)
        .then(data=>{
          if (data === undefined) {
            setValor({
              ...valor,
              FacturaEliminado:'Problemas, intente más tarde'
            });
          } else{
            setValor({
              redirect:true
            })
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
            return <Redirect to="/Factura/Support/"></Redirect>
        }
            
    }

    const mostrarFunciona = () => (
        <div className="alert alert-info" 
        style={{display: redirect ? '':''}}>
           
        {redirect && (

            <h4>{`Se ha eliminado exitosamente`}</h4>
        )}
        {!redirect && (

            <h4>{`no se hizo ninguna acción`}</h4>
        )}  
        
        </div>
    );

    return (
        <Layout titulo="ELIMINAR Factura" 
        descripcion="" 
        className="container-fluid">
            
            <div className="row">
            {mostrarFunciona()}  
               


            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
    
            <DialogTitle id="alert-dialog-title">{`¿vas a eliminar Este elemento permanentemente ?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               ¿Esta seguro de la acción que está a punto de hacer?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose(false)} color="primary">
                creo que no
              </Button>
              <Button onClick={handleClose(true)} color="primary" autoFocus>
                Seguro
              </Button>
            </DialogActions>
          </Dialog> 

         
          {redireccionarUsuario()}
                             
            </div>
        </Layout>
    );
}

export default EliminarFactura;
