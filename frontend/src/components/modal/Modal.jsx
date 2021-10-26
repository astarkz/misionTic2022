import React from 'react'
import 'components/modal/modal.css'


const Modal = ({ show, onClose }) => {


    if (!show) {
        return null;
    }

    return (
        <section className=" o-global-container d-flex align-items-center justify-content-center p-5" onClick={onClose}
        >
            <section className="o-modal-container rounded w-50 mw-51 p-2 modal-close" onClick={e => e.stopPropagation()}
            >
                <form>

                    <section className="up-modal-container">
                        <p className="p-0">Gestión de ventas</p>
                        <h1 className="p-0 mb-2">Ingresar nueva venta</h1>
                    </section>

                    <section className="center-modal-container">

                        <section className="o-labels">



                            <span className="d-flex">
                                <p>ID venta</p>
                                <input className="o-input-teext" type="text" id="idVenta"></input>
                            </span>

                            <span className="d-flex">
                                <p>Valor total</p>
                                <input className="o-input-teext" type="text" id="valorTotal"></input>
                            </span>
                            <span className="d-flex">
                                <p>Descripción</p>
                                <input className="o-input-teext" type="text" id="descripcion"></input>
                            </span>
                            <span className="d-flex">
                                <p>Fecha inicial</p>
                                <input className="o-input-teext" type="text" id="fechaInicial"></input>
                            </span>
                            <span className="d-flex">
                                <p>Fecha de pago</p>
                                <input className="o-input-teext" type="text" id="fechaPago"></input>
                            </span>
                            <span className="d-flex">
                                <p>ID del vendedor</p>
                                <input className="o-input-teext" type="text" id="idVendedor"></input>
                            </span>

                        </section>
                    </section>

                    <section className="bottom-modal-container d-flex justify-content-around ">
                        <button className="botonSecundarioo" onClick={onClose}>Cancelar</button>
                        <button className="botonPrincipall" >Ingresar venta</button>

                    </section>
                </form>
            </section>

        </section>
    )
}

export default Modal
