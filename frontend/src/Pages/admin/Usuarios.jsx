import React from 'react'
import Descripcion from 'components/descripcion/Descripcion'
import Tabla from 'components/tabla/Tabla';
import 'Pages/styles.css';
import descripcion from 'datasource/descripcion.json'
import tablaUsuarios from 'datasource/tablaUsuarios.json'
import modalInfo from 'datasource/modalInfo.json'
import { useState, useEffect } from 'react';


const Usuarios = () => {
    let [titulo, cuerpo] = Object.values(descripcion[2])
    let headers = Object.keys(tablaUsuarios[0])
    let data = Object.values(tablaUsuarios)
    let modal = modalInfo[2]

    const usuarios = [
        {
            nombre: "Juana",
            contraseña: "1234",
            rol: "vendedor",
            celular: "3213213214"

        },
        {
            nombre: "Sebastian",
            contraseña: "4567",
            rol: "usuario",
            celular: "3143143146"

        },
        {
            nombre: "Felipe",
            contraseña: "7894",
            rol: "usuario",
            celular: "3693693695"

        },
    ]
    const [mostrarTabla, setmostrarTabla] = useState(true)
    const [textoBoton, settextoBoton] = useState('')

    //si mostrar tabla es true, pongale al texto del boton crear nuevo usuario, sino mostrar usuarios
    useEffect(() => {
        if (mostrarTabla) {
            settextoBoton("Crear nuevo usuario +");
        }
        else {
            settextoBoton("Mostrar todos los usuarios");
        }
    }, [mostrarTabla])


    return (
        <section className="fondoGris">


            <Descripcion
                titulo={titulo}
                cuerpo={cuerpo}
                modal={modal}
            />

            <section className="bg-white rounded m-4 p-4 d-flex justify-content-center row  h-100 " >



                <button className="btn btn-danger col-lg-12 h-25 w-25 " onClick={() => { setmostrarTabla(!mostrarTabla) }}>{textoBoton}</button>

                {/* con set cambiamos el estado cada que se le da click */}
                {/*Si mostrar tabla es true, entonces se muestra tabla usuarios
                sino, se muestra formulario creacion usuarios*/ }

                {mostrarTabla ? <TablaUsuarios /> : <FormularioCreacionUsuarios />}

            </section>

        </section>



    )
}

const TablaUsuarios = () => {
    return <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Contraseña</th>
                <th>Rol</th>
                <th>Celular</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Maria</td>
                <td>1234</td>
                <td>Administrador</td>
                <td>3213213214</td>
            </tr>
            <tr>
                <td>Pablo</td>
                <td>4657</td>
                <td>Usuario</td>
                <td>378964144</td>
            </tr>
        </tbody>
    </table>


};

const FormularioCreacionUsuarios = () => {
    return <div className="d-flex row">
        <div><h2>Crear nuevo usuario</h2></div>
        <div>
            <form className="form-group col-sm-2 align-items-center">
                <label for="aname">input1</label>
                <input className="o-input-usuarios rounded  " id="aname" type="text" />
                <label for="bname">input2</label>
                <input className="o-input-usuarios rounded h-50" id="bname" type="text" />
                <label for="cname">input3</label>
                <input className="o-input-usuarios rounded h-50" id="cname" type="text" />
                <label for="dname">input4</label>
                <input className="o-input-usuarios rounded h-50" id="dname" type="text" />
                <button className="btn btn-danger">Guardar Usuario</button>
            </form>
        </div>
    </div>;
};



{/* <Tabla
                tipo="usuario"
                headers={headers}
                data={data} /> */}
export default Usuarios
