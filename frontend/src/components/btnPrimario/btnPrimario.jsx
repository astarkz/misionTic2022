import React, { useState } from 'react'
import 'components/btnPrimario/btnPrimario.css'

const BtnPrimario = ({ buttonText, buttonAccion }) => {
  

    return (
        <div>
            <button className="botonPrincipall" onClick={buttonAccion}>{buttonText}</button>
        </div>
    )
}

export default BtnPrimario
