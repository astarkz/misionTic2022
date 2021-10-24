import React from 'react'
import 'components/modal/modal.css'
import BtnPrimario from 'components/btnPrimario/BtnPrimario';
import BtnSecundario from 'components/btnSecundario/BtnSecundario';
import TextEntry from 'components/textEntry/TextEntry';

const Modal = ({ pageTitle, title, labels, tipo }) => {
    if (!show) {
        return null;
    }

    return (
        <section className="o-global-container d-flex align-items-center justify-content-center p-5" onClick={onClose}>
            <section className="o-modal-container rounded w-50 mw-51 p-2 modal-close" //onClick={e => e.stopPropagation()}
            >

                <section className="up-modal-container">
                    <p className="p-0">{pageTitle}</p>
                    <h1 className="p-0 mb-2">{title}</h1>
                </section>

                <section className="center-modal-container">
                    <section className="o-labels">
                        {
                            labels.map(label => {
                                return (
                                    <TextEntry label={label} tipo={tipo}/>
                                )
                            })
                        }
                    </section>
                </section>

                <section className="bottom-modal-container d-flex justify-content-around ">
                    <BtnPrimario buttonText="Aceptar" buttonAccion="" />
                    <BtnSecundario buttonText="Cancelar" buttonAccion="onClose" />
                </section>
            </section>  
        </section>
    )
}

export default Modal
