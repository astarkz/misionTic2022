import React from 'react'

const BtnSecundario = (buttonText, buttonAccion) => {
    return (
        <div>
            <button className="botonSecundarioo" onClick={buttonAccion}>{buttonText}</button>
        </div>
    )
}

export default BtnSecundario
