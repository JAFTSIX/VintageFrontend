//#region Expresiones regulares


const regex_texto = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\0-9]+$/
const regex_numero = /^[0-9]+$/
const regexsNombre_Apellido = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,60}$/

/*La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
NO puede tener otros símbolos. */
const regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

const regexsCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
//#endregion

export class resultado {
    
    constructor(valido,incidente) {
        this.valido= valido;
        this.incidente = incidente;
      }
}

function  isClienteValid(objeto) {
    var respuesta = new resultado(true, 'todo bien')

    if (!regexsNombre_Apellido.test(objeto.sNombre)) {
        //false
        return respuesta = new resultado(false, 'Tu Nombre tiene que tener mas de 1 carácter!')
    }
    if (!regexsNombre_Apellido.test(objeto.sApellido)) {
        //false
        return respuesta = new resultado(false, 'Tu Apellido tiene que tener mas de 1 carácter!')
    }
    if (!regexsCorreo.test(objeto.sCorreo)) {
        //false
        return respuesta = new resultado(false, 'El correo no es valido!')
    }
    if (!regexPassword.test(objeto.sContrasena)) {
        //false
        return respuesta = new resultado(false, 'Introducir al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos')
    }
    var today = new Date()
    var nacimiento = new Date(objeto.dNacimiento)

    if (!(today > nacimiento)) {
        //   alert ("Error!");
        return new resultado(false, 'Fecha inválida ')
    }

    return respuesta;
}



 function SwitchValidaCliente(name, value) {
    let respuesta = new resultado(true, 'todo bien')
    
    switch (name) {
        case 'sNombre':
            respuesta =
                regexsNombre_Apellido.test(value) ?
                  new resultado(true, 'todo bien') : new resultado(false, '¡Tu Nombre tiene que tener mas de 1 carácter!') ;
            
            break;
        case 'sApellido':
            respuesta =
                regexsNombre_Apellido.test(value) ?
                new resultado(true, 'todo bien'): new resultado(false,'¡Tu Apellido tiene que tener mas de 1 carácter!');

            break;
        case 'sCorreo':
            respuesta =
                regexsCorreo.test(value) ? new resultado(true, 'todo bien'): new resultado(false,'¡El correo no es valido!');

            break;
        case 'sContrasena':

          
            respuesta = regexPassword.test(value) ? new resultado(true, 'todo bien'): new resultado(false,'Introducir al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos');
           
            break;

        case 'password':

            respuesta = regexPassword.test(value) ? new resultado(true, 'todo bien'): new resultado(false,'Introducir al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos');

            break;

        default:

            respuesta = new resultado(true, 'todo bien')
            break;
    }
    return  respuesta

}


export  function checkingCliente(objeto) {

  var respuesta = new resultado(true, 'todo bien')


  respuesta =  isClienteValid(objeto);
  if (!respuesta.valido) {
    return respuesta;
  }


  return respuesta;
}





export  function HandleChangeValidation(name,value) {

    var respuesta = new resultado(true, 'todo bien')
  
  
    respuesta = SwitchValidaCliente(name,value);

  
    return respuesta;
  }
  
  
export  function checkingLogin(objeto) {

    var respuesta = new resultado(true, 'todo bien')
  
    if (!regexsCorreo.test(objeto.sCorreo)) {
        //false
      respuesta = new resultado(false, '¡El correo no es válido!')
    }
    if (!regexPassword.test(objeto.sContrasena)) {
        //false
        respuesta = new resultado(false, '¡La contraseña no es válida!')
    }

    if (!respuesta.valido) {
      return respuesta;
    }
  
  
    return respuesta;
  }
  
  
  
export  function HandleChangelogin(name,value) {

    var respuesta = new resultado(true, 'todo bien')
    switch (name) {
        case 'sCorreo':
            respuesta =
                regexsCorreo.test(value) ? new resultado(true, 'todo bien'): new resultado(false,'El correo no es valido!');

            break;
        case 'sContrasena':

            respuesta = regexPassword.test(value) ? new resultado(true, 'todo bien'): new resultado(false,'al menos un dígito, al menos una minúscula y al menos una mayúscula.NO puede tener otros símbolos');
           
            break;
        default:

                respuesta = new resultado(true, 'todo bien')
                break;

    }
  
    

  
    return respuesta;
  }


export function checkingHistorial(objeto) {

    var respuesta = new resultado(true, 'todo bien')



    //dFecha: string;

    if (!(new Date() > objeto.dFecha)) {
        //   alert ("Error!");
        return new resultado(false, 'Fecha inválida ')
    }
    //bMinTest: boolean;
    //pasa
    //iDuracion: number;
    if (!regex_numero.test(objeto.iDuracion)) {
        //false
        respuesta = new resultado(false, 'duración invalida')
    }

    //sCliente: string;

    if (!regex_texto.test(objeto.sCliente)) {
        //false
        respuesta = new resultado(false, 'id de cliente invalido')
    }
    //sReceta: string;

    if (!regex_texto.test(objeto.sReceta)) {
        //false
        respuesta = new resultado(false, 'id de receta invalido')
    }



    return respuesta;
}



export function checkingFactura(objeto) {

    var respuesta = new resultado(true, 'todo bien')



    //dFecha: string;

    if (!(new Date() > objeto.dFecha)) {
        //   alert ("Error!");
        return new resultado(false, 'Fecha inválida ')
    }
     

    //sCliente: string;

    if (!regex_texto.test(objeto.sCliente)) {
        //false
        respuesta = new resultado(false, 'id de cliente invalido')
    }
    //sReceta: string;

   



    return respuesta;
}