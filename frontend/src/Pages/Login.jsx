import React from 'react'
import google from 'img/google.png'
import user from 'img/deadpool-icon.png';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="o-global-containerr">
           <div className='o-login-container shadow-sm p-3 mb-5 bg-white rounded d-flex flex-column align-items-center
           justify-content-center'>
           <img className="o-img" src={user} alt="User picture" />
            <h1 className='p-1 m-0 text-center  w-0'>X-force</h1>
            <h3 className='p-3'>Inicia sesión</h3>

            <Link to='/admin/inicio'>
            <button className='p-1 h-3' type="submit" > 
                <img className="o-img" src={google} alt="Google logo" />
                Continua con Google
            </button>
            </Link>
           </div>
        </div>
    )
}

export default Login
