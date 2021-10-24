import React, {useState} from 'react'
import 'components/descripcion/descripcion.css'
import AgregarSection from 'components/agregar/AgregarSection'
import Modal from 'components/modal/Modal'

const Descripcion = ({ titulo, cuerpo, modal }) => {
    
    const [show, setShow] = useState(false);
    
    /*
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };*/
    
    return (
        <section className="o-container-description">
            <section className="o-description-text">
                <h1>{titulo}</h1>
                <p>{cuerpo}</p>
            </section>
            
            <Modal show={show}
                //handleClose={this.hideModal}
                pageTitle={modal.pageTitle}
                title={modal.title}
                labels={modal.labels}
                tipo={modal.tipo}/>

            <AgregarSection textoBoton={modal.buttonAdd} buttonAction={() => setShow(true)} />
            
        </section>
    )
}

export default Descripcion
