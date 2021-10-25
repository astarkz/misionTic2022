import React from 'react'
import 'components/modal/modal.css'

const ModalVendedor = (show, onClose) => {
    if (!show) {
        return null;
    }

    return (
        <section className=" o-global-container d-flex align-items-center justify-content-center p-5" onClick={onClose}
        >
            <section className="o-modal-container rounded w-50 mw-51 p-2 modal-close" onClick={e => e.stopPropagation()}
            >

                <section className="up-modal-container">
                    <p className="p-0">Gestión de vendedores</p>
                    <h1 className="p-0 mb-2">Agregar vendedor</h1>
                </section>

                <section className="center-modal-container">
                    <section className="o-labels">


                        <span className="d-flex">
                            <p>ID vendedor</p>
                            <input className="o-input-teext" type="text" id="idVendedor"></input>
                        </span>

                        <span className="d-flex">
                            <p>Nombre</p>
                            <input className="o-input-teext" type="text" id="nombreVendedor"></input>
                        </span>
                        <span className="d-flex">
                            <p>Especialidad</p>
                            <input className="o-input-teext" type="text" id="especialidaVendedor"></input>
                        </span>
                        <span className="d-flex">
                            <p>Fecha de ingreso</p>
                            <input className="o-input-teext" type="text" id="fechaIngreso"></input>
                        </span>
                        <span className="d-flex">
                            <p>Celular</p>
                            <input className="o-input-teext" type="text" id="celularVendedor"></input>
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

export default ModalVendedor
