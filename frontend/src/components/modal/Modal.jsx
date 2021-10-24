import React from 'react'
import 'components/modal/modal.css'

import BtnSecundario from 'components/btnSecundario/BtnSecundario';
import TextEntry from 'components/textEntry/TextEntry';
import BtnPrimario from 'components/btnPrimario/btnPrimario';

const Modal = ({ show, pageTitle, title, labels, tipo }) => {
    // if (show) {
    //     this.setVisible(true);
    // }
    // else {
    //     this.setVisible(false);
    // }

    if(!show){
        return null;
    }

    return (
        <section className=" o-global-container d-flex align-items-center justify-content-center p-5" //onClick={onClose}
        >
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
                                    <div className="d-flex justify-content-around">
                                        <div>
                                            <p className="p-0">{label}</p>
                                        </div>
                                        <div classname="p-0">
                                            <input className="entryText" type={tipo} id="username" name="username " placeholder="" />
                                        </div>
                                    </div>
                                )
                            })


                        }
                    </section>
                </section>

                <section className="bottom-modal-container d-flex justify-content-around ">
                    <BtnPrimario buttonText="Aceptar" buttonAccion="close" />
                    <BtnSecundario buttonText="Cancelar" buttonAccion="onClose" />
                </section>
            </section>
        </section>
    )
}

export default Modal
