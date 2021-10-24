import React from 'react'
import 'components/tabla/tabla.css';
import basura from 'img/delete.png';
import lapiz from 'img/pencil.png';
import quitar from 'img/quitar.png';
import IconoConTexto from 'components/iconoConTexto/IconoConTexto';

const Tabla = ({ headers, data, tipo }) => {
    //funcion para crear filas
    const createRow = (object) => {
        const columns = []

        for (let property in object) {
            columns.push(<td>{object[property]}</td>)
        }

        return (
            <tr className="dataFila">
                {columns}
            </tr>
        )
    }

    return (
        < section className = "contenedorSection" >
            <section className="contenedorElementosTabla">
                <IconoConTexto texto = "Quitar Seleccion" icono={quitar} />
                <IconoConTexto texto = "`Editar ${tipo}`" icono={lapiz} />
                <IconoConTexto texto = "`Eliminar ${tipo}`"  icono={basura} />
            </section>
            <section className="contenedorTabla">
                <table className="col-12">
                    <thead className="head">
                        <tr>
                            {
                                headers.map(header => {
                                    return (
                                        <th>{header}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody className="body">
                        {
                            data.map(row => {
                                return createRow(row)
                            })
                        }
                    </tbody>
                </table>
            </section>
        </section >
    )
}

export default Tabla
