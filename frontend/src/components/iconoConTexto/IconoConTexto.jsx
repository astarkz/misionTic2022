import React from 'react'
import 'components/iconoConTexto/iconoConTexto.css'

const IconoConTexto = ({texto, icono}) => {
    return (
        <section className="ord">
            <img className="l-img" src={icono} alt={texto} />
            <p className="opcionTabla">{texto}</p>
        </section>
    )
}

export default IconoConTexto
