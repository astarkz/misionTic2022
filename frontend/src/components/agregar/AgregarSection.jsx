import React from 'react'
import 'components/agregar/agregar.css'

const AgregarSection = ({textoBoton, buttonAction}) => {
    return (
        <section className="o-btn-container">
            <p className="o-textoo cta">{textoBoton}</p>
            <button className="o-button-add" onClick={buttonAction}>+</button>
        </section>
    )
}

export default AgregarSection;
