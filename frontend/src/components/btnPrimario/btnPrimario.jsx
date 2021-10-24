import React from 'react'

const BtnPrimario = (buttonText, buttonAccion) => {
    return (
        <div>
            <button className="botonPrincipall" onClick={buttonAccion}>{buttonText}</button>
        </div>
    )
}

export default BtnPrimario
