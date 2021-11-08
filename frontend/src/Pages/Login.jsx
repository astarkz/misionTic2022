import React from 'react'
import google from 'img/google.png'
import user from 'img/deadpool-icon.png';
import { Link } from 'react-router-dom';
import 'Pages/styles.css'

const Login = () => {
    return (
        <div className="o-global-containerr">
            <div className='o-login-container shadow-sm p-3 mb-5 rounded d-flex flex-column align-items-center
           justify-content-center'>
                <img className="o-img img-login" src={user} alt="Foto del usuario" />
                <h1 className='p-1 m-0 text-center  w-0'>X-force Team</h1>
                <h3 className='p-3'>Inicia sesión</h3>
                <form className='mt-8 max-w-md'>
                    <div className='o-form d-flex flex-column align-items-center justify-content-center'>
                        <input
                            className='m-2 o-input appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            type='email'
                            placeholder='Correo electrónico'
                            required
                        />
                        <input
                            className='o-input m-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900'
                            type='password'
                            placeholder='Password'
                            required
                        />
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <label htmlFor='recuerdame'>
                                <input className='m-2' type='checkbox' name='recuerdame' />
                                Recuerdame
                            </label>
                        </div>
                        <div className='m-2' >
                            <Link to='/'>¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                    <div>
                        <Link to='/admin/inicio'>
                            <button className='.o-btn-login-primary'
                                type='submit'>Iniciar Sesion</button>
                        </Link>
                    </div>
                    <div>O</div>
                    <div>
                        <Link to='/admin/inicio'>
                            <button className='.o-btn-login-primary' type="submit" >
                                <img className="o-icono" src={google} alt="Google logo" />
                                Continua con Google
                            </button>
                        </Link>
                    </div>
                </form>

                
            </div>
        </div>
    )
}

export default Login
