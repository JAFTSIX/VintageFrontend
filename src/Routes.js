import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom' //esto guarda todos los componentes
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Password from './user/Password';

import Principal from './nucleo/Principal';

import PrivateRoute from './autentificacion/PrivadoRoute';
import VideoRoute from './autentificacion/VideoRoute';
import Perfil from './user/Perfil';
import ModificarPerfil from './user/ModificarPerfil';
import AdminRoute from './autentificacion/AdminRoute';
import AdminD from './user/AdminD';
import ModificarPerfilAdmin from './admin/support/admins/ModificarPerfilAdmin';

import Activar from './user/procesos/Activar';

import categoria from './admin/support/Categorias/listar';
import EliminarCategoria from './admin/support/Categorias/delete';
import ModificarCategoria from './admin/support/Categorias/update';
import AgregarCategoria from './admin/support/Categorias/insert';

import SignUpAdmin from './admin/support/admins/insert';


import Factura from './admin/support/Factura/listar';
import EliminarFactura from './admin/support/Factura/delete';
import ModificarFactura from './admin/support/Factura/update';
 


import Historial from './admin/support/Historial/listar';
import EliminarHistorial from './admin/support/Historial/delete';
import ModificarHistorial from './admin/support/Historial/update';
 

import AgregarProducto from './admin/AgregarProducto';
import Producto from './user/Producto';
import ModificarProducto from './admin/ModificarProducto';
import EliminarProducto from './admin/EliminarProducto';
import Receta from './user/Receta';
import AgregarReceta from './admin/AgregarReceta';
import ModificarReceta from './admin/ModificarReceta';
import EliminarReceta from './admin/EliminarReceta';
import RecetaDetalle from './user/RecetaDetalle';
import ProductoDetalle from './user/ProductoDetalle';
import './index.css';

import Carrito from './user/CarritoCompra/Carrito';

//props --> parámetro de consulta props se puede 
//utilizar en varios comandos GET 
//que devuelven un recurso de instancia única. 
//BrowserRouter --> hace el props

const Routes = () => {
    return ( 
    <BrowserRouter> 
        <Switch>
            
        
        <Route path="/" exact component={Principal}/>



            <Route path="/SignIn" exact component={SignIn}/>
            <Route path="/SignUp" exact component={SignUp}/>
            <Route path="/Password" exact component={Password}/>
            <PrivateRoute path="/Perfil" exact component={Perfil}/>
            <PrivateRoute path="/Cliente/:perfilId" exact component={ModificarPerfil}/>
            <AdminRoute path="/Admin" exact component={AdminD}/>
            <AdminRoute path="/Admin/:perfilId" exact component={ModificarPerfilAdmin}/>

            <Route path="/producto" exact component={Producto}/>
            <AdminRoute path="/producto/agregar" 
            exact component={AgregarProducto}/>
            <AdminRoute path="/Articulo/:productId/" 
            exact component={ModificarProducto}/>
            <AdminRoute path="/Articulo/Eliminar/:productId" 
            exact component={EliminarProducto}/>

            <Route path="/receta" exact component={Receta}/>
            <AdminRoute path="/receta/agregar" 
            exact component={AgregarReceta}/>
            
            <AdminRoute path="/Receta/:recetaId/" 
            exact component={ModificarReceta}/>
            <AdminRoute path="/Receta/Eliminar/:recetaId" 
            exact component={EliminarReceta}/>

            {
                /**
                 * Ruta de recetas
                 * 3 posibilidades
                 * mostrar receta si tiene precio 0
                 * mostrar trailer si tiene precio>0 y /Cliente/Ver/{id}==false
                 * mostrar curso si tiene precio>0 y /Cliente/Ver/{id}==true
                 */

              
            }

            <Route path="/Receta/Detalle/:recetaId" exact
                component={RecetaDetalle}/>

            
             
             <Route path="/Articulo/Detalle/:productoId" exact
             component={ProductoDetalle}/>
            
             
             <AdminRoute path="/categoria/Support/" 
            exact component={categoria}/>
            <AdminRoute path="/categoria/Support/agregar" 
            exact component={AgregarCategoria}/>
            <AdminRoute path="/categoria/Support/Eliminar/:_Id" 
            exact component={EliminarCategoria}/>
            <AdminRoute path="/categoria/Support/actualizar/:_Id/" 
            exact component={ModificarCategoria}/>

            <AdminRoute path="/Factura/Support/" 
            exact component={Factura}/>
        
            <AdminRoute path="/Factura/Support/Eliminar/:_Id" 
            exact component={EliminarFactura}/>
            <AdminRoute path="/Factura/Support/actualizar/:_Id/" 
            exact component={ModificarFactura}/>


            <AdminRoute path="/Historial/Support/" 
            exact component={Historial}/>
             
            <AdminRoute path="/Historial/Support/Eliminar/:_Id" 
            exact component={EliminarHistorial}/>
            
            
            <Route path="/activar/token/:token" exact
              component={Activar}/>
     {/*       
            <Route path="/activar/token/:token" exact
              component={RecetaDetalle}/>
     */}
            <PrivateRoute path="/Cart" exact
             component={Carrito}/>


             <AdminRoute path="/admin/Support/insert" 
             exact component={SignUpAdmin}/>

        </Switch>
    </BrowserRouter>
    );
}

export default Routes;