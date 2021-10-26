import React from 'react'
import user from 'img/deadpool-icon.png';
import 'components/navbarpublic/Publicnavbar.css'
import { Link } from 'react-router-dom';

const Publicnavbar = () => {
    return (
        <div className="bg-primary d-flex w-100 align-items-center justify-content-space-between">

            <section className='d-flex align-items-center'>
                <img className="o-img o-searchh" src={user} alt="Log out" />
                <h3>X-force team</h3>
            </section>
            <section>
                <Link to='/login'>
                    <button className='o-btn-publiclogin'>Iniciar sesión</button>
                </Link>
            </section>

        </div>
    )
}

export default Publicnavbar
