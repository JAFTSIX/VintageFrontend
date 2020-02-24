//#region Expresiones regulares


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

function No_Vacio(objeto) {
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
        return respuesta = new resultado(false, ' al menos un dígito, al menos una minúscula y al menos una mayúscula.NO puede tener otros símbolos')
    }
    var today = new Date()
    var nacimiento = new Date(objeto.dNacimiento)

    if (!(today > nacimiento)) {
        //   alert ("Error!");
        return new resultado(false, '¿como le haces para haber nacido hoy y registrarte aqui?')
    }

    return respuesta;
}



 function estavez(name, value) {
    let respuesta = new resultado(true, 'todo bien')
    
    switch (name) {
        case 'sNombre':
            respuesta =
                regexsNombre_Apellido.test(value) ?
                  new resultado(true, 'todo bien') : new resultado(false, 'Tu Nombre tiene que tener mas de 1 carácter!') ;
            
            break;
        case 'sApellido':
            respuesta =
                regexsNombre_Apellido.test(value) ?
                new resultado(true, 'todo bien'): new resultado(false,'Tu Apellido tiene que tener mas de 1 carácter!');

            break;
        case 'sCorreo':
            respuesta =
                regexsCorreo.test(value) ? new resultado(true, 'todo bien'): new resultado(false,'El correo no es valido!');

            break;
        case 'sContrasena':

          
            respuesta = regexPassword.test(value) ? new resultado(true, 'todo bien'): new resultado(false,'al menos un dígito, al menos una minúscula y al menos una mayúscula.NO puede tener otros símbolos');
           
            break;

        case 'password':

            respuesta = regexPassword.test(value) ? new resultado(true, 'todo bien'): new resultado(false,'al menos un dígito, al menos una minúscula y al menos una mayúscula.NO puede tener otros símbolos');

            break;

        default:

            respuesta = new resultado(true, 'todo bien')
            break;
    }
    return  respuesta

}


export  function checking(objeto) {

  var respuesta = new resultado(true, 'todo bien')


  respuesta = No_Vacio(objeto);
  if (!respuesta.valido) {
    return respuesta;
  }


  return respuesta;
}





export  function HandleChangeValidation(name,value) {

    var respuesta = new resultado(true, 'todo bien')
  
  
    respuesta = estavez(name,value);

  
    return respuesta;
  }
  
  