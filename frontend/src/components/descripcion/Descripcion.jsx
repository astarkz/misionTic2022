import React, {useState} from 'react'
import 'components/descripcion/descripcion.css'
// import AgregarSection from 'components/agregar/AgregarSection'
// import Modal from 'components/modal/Modal'

//ya no recibe modal
const Descripcion = ({ titulo, cuerpo }) => {
    
    //const [show, setShow] = useState(false);
    
    return (
        <section className="o-container-description">
            <section className="o-description-text">
                <h1>{titulo}</h1>
                <p>{cuerpo}</p>
            </section>    
        </section>
    )
}

export default Descripcion
