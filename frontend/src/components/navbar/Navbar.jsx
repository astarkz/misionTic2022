import React from 'react'
import 'components/navbar/Navbar.css';
import {Link, NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="o-main-container">
            <div className="o-navbar navbar justify-content-around nav-link active">
                <nav>
                <ul>                    
                    <NavLink exact to='/admin/inicio' activeClassName="o-active">Inicio</NavLink>
                    <NavLink exact to='/admin/ventas' activeClassName="o-active">Ventas</NavLink>
                    <NavLink exact to='/admin/vendedores' activeClassName="o-active">Vendedores</NavLink>
                    <NavLink exact to='/admin/usuarios' activeClassName="o-active">Usuarios y Roles</NavLink>
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
