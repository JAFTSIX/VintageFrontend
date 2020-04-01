import { CardText } from "material-ui";

export const agregarProductoCarrito = (producto,bool, next) => {
    let carrito = []
    if(typeof window !== 'undefined'){
        // localStorage.getItem() get item de localStorage 
        // carrito -> nombre que se usa para guardar todos los productos 
        // agregar productos al localStorage del carrito compras 
        if(localStorage.getItem('carrito')){
            carrito=JSON.parse(localStorage.getItem('carrito'));
        }

        
        if (bool==0) {
        producto.iCant=1;    
        }
        carrito.push({
            ...producto,             
            recetaOProducto:bool, //determinar si es receta 1 o producto 0
        });

        // elimina duplicados 
        // crea un nuevo arreglo con new Set y lo transforma en un arreglo con Array.form 
        // para despues hacer re-map 
        // new set solo permite valorees unicos 
        // entonces pasa los id de cada producto 
        // ...con el arreglo de id en el primer map 
        // y correr map denuevo para que retorne los productos actuales del carrito 
        carrito = Array.from(new Set(carrito.map((p=>p._id)))).map(id=>{
            return carrito.find(p=>p._id === id)
        });
        // aumentar el count en caso que exista duplicados 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        next();
    }
};

// metodo Cantidad de productos en el carrito LENGH 
export const productoTotal = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('carrito')){
            return JSON.parse(localStorage.getItem('carrito')).length;
        }
    }
    return 0;
}

// get productos del localStorage
export const getProductosLocalStorage = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('carrito')){
            console.log(JSON.parse(localStorage.getItem('carrito')));
            return JSON.parse(localStorage.getItem('carrito'));
            
        }
    }
    return [];
};

export const actualizarCantidad = (productoId, count) => {
    let carrito = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('carrito')){
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }

        // recorrer todos los productos de localStorage 
        carrito.map((producto, i)=>{
            
            // comparar el id de los productos del localStorage con el id que pasamos 
            //por param de Carrito que se seleccion para cambiar la cantidad
            if(producto._id === productoId){
                // el valor count del proyecto va ser el count que se ingresa de lo que ingresa el usuario 
                carrito[i].count = count;
                carrito[i].iCant=count
                console.log(carrito)
            }
        });
         
        // cambiar ese valor en el localStorage 
        localStorage.setItem('carrito', JSON.stringify(carrito));

    }
}

export const eliminarProductoCarrito = (productoId) => {
    let carrito = [];
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('carrito')){
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }

        // recorrer todos los productos de localStorage 
        carrito.map((producto, i)=>{
            // comparar el id de los productos del localStorage con el id que pasamos 
            //por param de Carrito que se seleccion para cambiar la cantidad
            if(producto._id === productoId){
                // splice -> elimina 1 elemento del index
                // elimina producto del array 
                carrito.splice(i, 1);
                console.log(carrito);
            }
        });

        // cambiar ese valor en el localStorage 
        localStorage.setItem('carrito', JSON.stringify(carrito));

    }

    return carrito;
}

export const eliminarTodoProductoCarrito = () => {
    
    if(typeof window !== 'undefined'){
         
        localStorage.setItem('carrito', JSON.stringify([]));

    }

    
}


export const SetProductosCarrito = (productos ) => {
 
        let carrito = productos
        if(typeof window !== 'undefined'){
            
            console.log('carrito',carrito)
           
            
            localStorage.setItem('carrito', JSON.stringify(carrito));
      
        }
 };