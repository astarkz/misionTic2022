import React, { useState } from 'react'
import 'components/btnPrimario/btnPrimario.css'

const BtnPrimario = ({ buttonText, buttonAccion }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <div>
            <button className="botonPrincipall" onClick={handleClose}>{buttonText}</button>
        </div>
    )
}

export default BtnPrimario
