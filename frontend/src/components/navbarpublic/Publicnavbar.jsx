import React from 'react'
import user from 'img/deadpool-icon.png';
import 'components/navbarpublic/Publicnavbar.css'
import { Link } from 'react-router-dom';

const Publicnavbar = () => {
    return (
        <div className="bg-primary d-flex w-100 align-items-center justify-content-space-between">
            <ul  className="d-flex align-items-center navbar">
                <li>
                    <img className="o-img o-searchh" src={user} alt="Log out" />
                </li>
                <li>
                    <h3>X-force team</h3>
                </li>
                <li>
                    <div class="buscar">
                        <input placeholder="Buscar un producto" />
                        <i class="fas fa-search botonGenerico iconoBusqueda"></i>
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

            <section>
                
            </section>

        </div>
    )
}

export default Publicnavbar
