import React from 'react'
import 'components/nabvar/Navbar.css';
import {Link, NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="o-main-container">
            <div className="o-navbar-container">
                <ul>                    
                    <NavLink exact to='/inicio' activeClassName="o-active">Inicio</NavLink>
                    <NavLink exact to='/ventas' activeClassName="o-active">Ventas</NavLink>
                    <NavLink exact to='/vendedores' activeClassName="o-active">Vendedores</NavLink>
                    <NavLink exact to='/usuarios' activeClassName="o-active">Usuarios y Roles</NavLink>
                    {/* <Link to='/ventas'>Ventas</Link>
                    <Link to='/vendedores'>Vendedores</Link>
                    <Link to='/usuarios'>Roles y Usuarios</Link> */}
                </ul>
            </div>
        </div>
    )
}

export default Navbar