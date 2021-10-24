import React from 'react'
import 'components/btnSecundario/btnSecundario.css'
import { useState } from 'react'

const BtnSecundario = ({ buttonText, buttonAccion }) => {

    const [show, setShow] = useState(false);
   
    return (
        <div>
            <button className="botonSecundarioo" onClick={buttonAccion}>{buttonText}</button>
        </div>
    )
}

export default BtnSecundario
