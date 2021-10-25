import React from 'react'
import 'components/modal/modal.css'

const ModalUsuario = (show, onClose) => {
    if (!show) {
        return null;
    }

    return (
        <section className=" o-global-container d-flex align-items-center justify-content-center p-5" onClick={onClose}
        >
            <section className="o-modal-container rounded w-50 mw-51 p-2 modal-close" onClick={e => e.stopPropagation()}
            >

                <section className="up-modal-container">
                    <p className="p-0">Gestión de Usuarios y Roles</p>
                    <h1 className="p-0 mb-2">Agregar nuevo usuario</h1>
                </section>

                <section className="center-modal-container">
                    <section className="o-labels">


                        <span className="d-flex">
                            <p>ID vendedor</p>
                            <input className="o-input-teext" type="text" id="idVendedor"></input>
                        </span>

                        <span className="d-flex">
                            <p>Nombre</p>
                            <input className="o-input-teext" type="text" id="nombreUsuario"></input>
                        </span>
                        <span className="d-flex">
                            <p>Contraseña</p>
                            <input className="o-input-teext" type="password" id="contraseñaUsuario"></input>
                        </span>
                        <span className="d-flex">
                            <p>Rol</p>
                            <input className="o-input-teext" type="text" id="rolUsuario"></input>
                        </span>
                        <span className="d-flex">
                            <p>Celular</p>
                            <input className="o-input-teext" type="text" id="celularUsuario"></input>
                        </span>
                        <span className="d-flex">
                            <p>Permisos</p>
                            <select id="cars" name="cars">
                                <option value="lectura">Lectura</option>
                                <option value="escritura">Escritura</option>
                                <option value="ninguno">Niguno</option>
                            </select>
                        </span>


                    </section>
                </section>

                <section className="bottom-modal-container d-flex justify-content-around ">
                    <button className="botonSecundarioo" onClick={onClose}>Cancelar</button>
                    <button className="botonPrincipall" >Ingresar venta</button>

                </section>
            </section>
        </section>
    )
}

export default ModalUsuario
