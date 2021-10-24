import React from 'react'
import 'components/btnSecundario/btnSecundario.css'

const BtnSecundario = ({ buttonText, buttonAccion }) => {
    return (
        <div>
            <button className="botonSecundarioo" onClick={buttonAccion}>{buttonText}</button>
        </div>
    )
}

export default BtnSecundario
