import React from 'react'
import Descripcion from 'components/descripcion/Descripcion'
import Tabla from 'components/tabla/Tabla';
import 'Pages/styles.css';
import descripcion from 'datasource/descripcion.json'
import tablaUsuarios from 'datasource/tablaUsuarios.json'
import modalInfo from 'datasource/modalInfo.json'


const Usuarios = () => {
    let [titulo, cuerpo] = Object.values(descripcion[2])
    let headers = Object.keys(tablaUsuarios[0])
    let data = Object.values(tablaUsuarios)
    let modal = modalInfo[2]

    return (
        <section className="fondoGris">

            
            <Descripcion
                titulo = {titulo}
                cuerpo={cuerpo}
                modal = {modal}
            />
            <Tabla
                tipo="usuario"
                headers={headers}
                data={data}/>
        </section>
    )
}

export default Usuarios
