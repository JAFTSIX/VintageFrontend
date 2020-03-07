import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom' //esto guarda todos los componentes
import SignUp from './user/SignUp';
import SignIn from './user/SignIn';
import Principal from './nucleo/Principal';
import PrivateRoute from './autentificacion/PrivadoRoute';
import Perfil from './user/Perfil';
import AdminRoute from './autentificacion/AdminRoute';
import AdminD from './user/AdminD';
import AgregarCategoria from './admin/AgregarCategoria';
import AgregarProducto from './admin/AgregarProducto';
import Producto from './user/Producto';
import ModificarProducto from './admin/ModificarProducto';
import EliminarProducto from './admin/EliminarProducto';
import Receta from './user/Receta';
import AgregarReceta from './admin/AgregarReceta';
import ModificarReceta from './admin/ModificarReceta';
import EliminarReceta from './admin/EliminarReceta';
import RecetaDetalle from './user/RecetaDetalle';
import './index.css'

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
            <PrivateRoute path="/Perfil" exact component={Perfil}/>
            <AdminRoute path="/Admin" exact component={AdminD}/>
            
            <Route path="/producto" exact component={Producto}/>
            <AdminRoute path="/producto/agregar" 
            exact component={AgregarProducto}/>
            <AdminRoute path="/Articulo/:productId/" 
            exact component={ModificarProducto}/>
            <AdminRoute path="/Eliminar/Articulo/:productId" 
            exact component={EliminarProducto}/>

            <Route path="/receta" exact component={Receta}/>
            <AdminRoute path="/receta/agregar" 
            exact component={AgregarReceta}/>
            <AdminRoute path="/receta/agregar/categoria" 
            exact component={AgregarCategoria}/>
            <AdminRoute path="/Receta/:recetaId/" 
            exact component={ModificarReceta}/>
            <AdminRoute path="/Eliminar/Receta/:recetaId" 
            exact component={EliminarReceta}/>
            <PrivateRoute path="/Receta/Detalle/:recetaId" exact
             component={RecetaDetalle}/>


        </Switch>
    </BrowserRouter>
    );
}

export default Routes;