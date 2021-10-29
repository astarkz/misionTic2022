import React from 'react'
import user from 'img/deadpool-icon.png';
import 'components/navbarpublic/Publicnavbar.css'
import { Link } from 'react-router-dom';

const Publicnavbar = () => {
    return (
        <div className="m-0">
            <ul  className="navbar">
                <li>
                    <img className="oo-img o-searchh" src={user} alt="Log out" />
                </li>
                <li>
                    <h3>X-force team</h3>
                </li>
                <li>
                    <div className="o-buscar">
                        <input placeholder="Buscar un producto" />
                        <i className="fas fa-search botonGenerico iconoBusqueda"></i>
                    </div>
                </li>
                <li>
                    <Link to='/login'>
                    <button className='o-btn-publiclogin botonGenerico mainButton'>Iniciar sesión</button>
                    </Link>
                </li>
                <li>
                    <Link to='/login'>
                        <button className='o-btn-publiclogin botonGenerico secondaryButton'>Registro</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Publicnavbar
