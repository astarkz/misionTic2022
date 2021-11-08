
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from './layouts/Layout';
import Publiclayout from './layouts/Publiclayout';
import Authlayout from './layouts/Authlayout'
import Inicio from './Pages/admin/Index';
import Usuarios from './Pages/admin/Usuarios';
import Vendedores from './Pages/admin/Vendedores';
import Ventas from './Pages/admin/Ventas';
import Index from './Pages/Index';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Auth0Provider} from "@auth0/auth0-react"


function App() {
  return (

    //auth0provider engloba toda la aplicacion para que podamos usar autenticacion en cualquier parte
    <Auth0Provider
    domain='misiontic-figurascoleccion.us.auth0.com'
    clientId='noLL4IfQRNCli25Pu9jsdzSDvZDfVXD7'
    //noLL4IfQRNCli25Pu9jsdzSDvZDfVXD7
    redirectUri='http://localhost:3000/admin/inicio'
    audience='api-autenticacion-figuras-mintic'
    
    >
    <div className="App">
      {/* Para cada layour se crea un route path que es un array, por ejemplo el de /admin
luego de eso se abre el contenedor principal (layout) y dentro un switch que contendra
todas las rutas que vendran dentro, en este caso vendedores, ventas, inicio y usuarios*/}
      <Router>
        <Switch>
          {/* rutas parte privada admin*/}
          <Route path={['/admin/inicio', '/admin/usuarios', '/admin/ventas', '/admin/vendedores']}>
            <Layout>
              <Switch>
                <Route path='/admin/inicio'>
                  <Inicio />
                </Route>
                <Route path='/admin/usuarios'>
                  <Usuarios />
                </Route>
                <Route path='/admin/ventas'>
                  <Ventas />
                </Route>
                <Route path='/admin/vendedores'>
                  <Vendedores />
                </Route>
              </Switch>
            </Layout>
          </Route>

          {/* rutas parte autenticación*/}
          <Route path={['/login']}>
            <Authlayout>
              <Switch>
                <Route path='/login'>
                  <Login />
                </Route>
              </Switch>
            </Authlayout>
          </Route>
          {/* rutas landing page*/}
          <Route path={['/']} >
            <Publiclayout>
              <Switch>
                <Route path='/'>
                  <Index />
                </Route>
              </Switch>
            </Publiclayout>
          </Route>
        </Switch>
      </Router>
    </div>
    </Auth0Provider>
  );
}

export default App;
