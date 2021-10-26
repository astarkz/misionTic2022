import React from 'react'
import google from 'img/google.png'
import user from 'img/deadpool-icon.png';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="o-global-container">
           <div className='o-login-container d-flex flex-column justify-content-center'>
           <img className="o-img" src={user} alt="User picture" />
            <h1>X-force</h1>
            <h3>Inicia sesión</h3>

            <Link to='/admin/inicio'>
            <button className='p-1 h-3' type="submit" >Continua con Google</button>
            </Link>
           </div>
        </div>
    )
}

export default Login
