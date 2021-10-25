import React, {useState} from 'react'
import 'components/descripcion/descripcion.css'
import AgregarSection from 'components/agregar/AgregarSection'
import Modal from 'components/modal/Modal'

const Descripcion = ({ titulo, cuerpo, modal }) => {
    
    const [show, setShow] = useState(false);
    
    return (
        <section className="o-container-description">
            <section className="o-description-text">
                <h1>{titulo}</h1>
                <p>{cuerpo}</p>
            </section>
            
            <AgregarSection textoBoton={modal.buttonAdd} buttonAction={() => setShow(true)} />
            <Modal 
                onClose={()=> setShow(false)}
                show={show}
                pageTitle={modal.pageTitle}
                title={modal.title}
                labels={modal.labels}
                tipo={modal.tipo}/>

        
            
        </section>
    )
}

export default Descripcion
