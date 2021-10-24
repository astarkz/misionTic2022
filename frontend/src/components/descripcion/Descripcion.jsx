import React from 'react'
import 'components/descripcion/descripcion.css'
import AgregarSection from 'components/agregar/AgregarSection'

const Descripcion = ({ titulo, cuerpo, modal }) => {
    return (
        <section className="o-container-description">
            <section className="o-description-text">
                <h1>{titulo}</h1>
                <p>{cuerpo}</p>
            </section>
            <AgregarSection textoBoton={modal.buttonAdd} buttonAction=""/>
        </section>
    )
}

export default Descripcion
