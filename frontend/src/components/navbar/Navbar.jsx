import React from 'react'
import 'components/navbar/Navbar.css';
import { NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="o-main-container">
            <div className="o-navbar navbar justify-content-around nav-link active">
                <nav>
                <ul className='d-flex w-100 '>                    
                   <li className='m-2 mt-3 mb-0 '> <NavLink exact to='/admin/inicio' activeClassName="o-active">Inicio</NavLink> </li>
                   <li className='m-2 mt-3 mb-0 '> <NavLink exact to='/admin/ventas' activeClassName="o-active">Ventas</NavLink></li>
                   <li className='m-2 mt-3 mb-0 '> <NavLink exact to='/admin/vendedores' activeClassName="o-active">Vendedores</NavLink></li>
                   <li className='m-2 mt-3 mb-0 '> <NavLink exact to='/admin/usuarios' activeClassName="o-active">Usuarios y Roles</NavLink></li>
                     {/* <Link to='/ventas'>Ventas</Link>
                    <Link to='/vendedores'>Vendedores</Link>
                    <Link to='/usuarios'>Roles y Usuarios</Link> */}
                </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
