import React from 'react'
import 'components/header/Header.css';
import notifications from 'img/bell.png';
import user from 'img/deadpool-icon.png';
import logout from 'img/logout.png';
import search from 'img/loupe.png';
import {useAuth0} from '@auth0/auth0-react';

//con el sniper Rafce me crea el componene header como un arrow function
const Header = () => {
    const{logout}=useAuth0();
    return (
        <section className="o-main-container">
            <section className="o-up-navbar">
                <section>
                    <h3>X-force team</h3>
                </section>

                <section>
                    <form action="">
                        <input className="o-input-text" type="text" id="username" name="username " placeholder="Buscar.." />
                        <img className="o-img o-searchh" src={search} alt="Log out" />
                    </form>
                </section>

                <section className="o-user-bar">
                    <img className="o-img" src={notifications} alt="Notifications" />
                    <img className="o-img" src={user} alt="User picture" />
                    <h4>Administrador</h4>
                   <button className='' onClick={()=>logout({returnTo:window.location.origin})}>
                   <i class="fas fa-sign-out-alt"></i>

                     
                    </button>
                </section>

            </section>

        </section>
    )
}

export default Header
