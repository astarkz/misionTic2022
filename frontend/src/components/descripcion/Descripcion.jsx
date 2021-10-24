import React from 'react'
import 'components/descripcion/descripcion.css'

const Descripcion = () => {
    return (
        <div className="descripcionContenedor">
            <h1>{titulo}</h1>
            <p>{cuerpo}</p>
        </div>
    )
}

export default Descripcion
