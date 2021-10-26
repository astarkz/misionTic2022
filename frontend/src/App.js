
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
import Registro from './Pages/Registro';


function App() {
  return (
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
          <Route path={['/login', '/registro']}>
            <Authlayout>
              <Switch>
                <Route path='/login'>
                  <Login />
                </Route>
                <Route path='/registro'>
                  <Registro />
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
  );
}

export default App;
