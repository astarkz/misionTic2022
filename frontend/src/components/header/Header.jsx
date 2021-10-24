import React from 'react'
import 'components/header/Header.css';
import notifications from 'img/bell.png';
import user from 'img/deadpool-icon.png';
import logout from 'img/logout.png';
import search from 'img/loupe.png';

//con el sniper Rafce me crea el componene header como un arrow function
const Header = () => {
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
                    <img className="o-img" src={logout} alt="Log out" />
                </section>

            </section>

        </section>
    )
}

export default Header
