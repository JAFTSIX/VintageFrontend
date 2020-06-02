import React, {useState, useEffect} from 'react';
import Layout from '../../nucleo/Layout';
import {getObjeto,errorTranslator} from './../../admin/apiAdmin';
import {Redirect} from 'react-router-dom';
import '../../index.css';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Activar = (props) => {
    const [valor, setValor] = useState({                  
        redirect:false,
    });

    

    const [open, setOpen] = React.useState(false);
    
    const { redirect} = valor;

    const handleClose= x=>event => {
        
      
        setValor({redirect:true})       
         
        setOpen(false);
    };

    const activar = token => {

        //http://localhost:3001/activar/token/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphZnRiZXJrQG91dGxvb2suY29tIiwibmFtZSI6ImFhIiwiaWF0IjoxNTkxMTE1NjEyLCJleHAiOjE1OTExMzcyMTJ9.cBjq84YXZSfxF5qvAFx4fFvAJGiT7fQM-9_PS4ulJOI
        getObjeto('Cliente/activar/token/'+token)
        .then((data={error:{message:'hay un problema, intente más tarde'}})=>{
            console.log(data)
             if('error' in data){
                setValor({...valor, error:errorTranslator(data.error.message)});
            }else{
                //string
                //Su cuenta fue Activada Exitosamente
                console.log(data);
                setOpen(true);
                //dialog
            }
            
        })
        //pone esitoso en el dialog
    }

    useEffect(()=>{
        const token = props.match.params.token
        console.log(token)
        activar(token)
       
    }, []);

    const redireccionarUsuario = () => {
        if(redirect){
            return <Redirect to="/SignIn"></Redirect>
        }
            
    }


    return (

            <div className="row">

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
    
            <DialogTitle id="alert-dialog-title">{`Excelente`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               su cuenta se ha activado
              </DialogContentText>
            </DialogContent>
            <DialogActions>        
              <Button onClick={handleClose(1)} color="primary" autoFocus>
                ok
              </Button>
            </DialogActions>
          </Dialog> 

         
          {redireccionarUsuario()}
                             
            </div>

    );
}

export default Activar;
