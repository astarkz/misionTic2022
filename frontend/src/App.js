
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Inicio from './Pages/Inicio';
import Usuarios from './Pages/Usuarios';
import Vendedores from './Pages/Vendedores';
import Ventas from './Pages/Ventas';


function App() {
  return (
    <div className="App">

      <Router>
        <Layout>
          <Switch>
            <Route path='/inicio' exact>
              <Inicio />
            </Route>
            <Route path='/ventas' exact>
              <Ventas />
            </Route>
            <Route path='/vendedores' exact>
              <Vendedores />
            </Route>
            <Route path='/usuarios' exact>
              <Usuarios />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
