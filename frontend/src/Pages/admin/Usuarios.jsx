import React from 'react'
import Descripcion from 'components/descripcion/Descripcion'
import Tabla from 'components/tabla/Tabla';
import 'Pages/styles.css';
import descripcion from 'datasource/descripcion.json'
import tablaUsuarios from 'datasource/tablaUsuarios.json'
import modalInfo from 'datasource/modalInfo.json'
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const usuariosBackend = [
    {
        nombre: 'Juana',
        contraseña: '1234',
        rol: 'vendedor',
        celular: '3213213214'

    },
    {
        nombre: 'Sebastian',
        contraseña: '4567',
        rol: 'usuario',
        celular: '3143143146'

    },
    {
        nombre: 'Felipe',
        contraseña: '7894',
        rol: 'usuario',
        celular: '3693693695'

    },
    {
        nombre: 'Laura',
        contraseña: 'boba',
        rol: 'usuario',
        celular: '3693693695'

    }

];
const Usuarios = () => {
    let [titulo, cuerpo] = Object.values(descripcion[2])
    // let headers = Object.keys(tablaUsuarios[0])
    // let data = Object.values(tablaUsuarios)
    let modal = modalInfo[2]

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('');


    //use effect vacio para traer los datos del backend

    useEffect(() => {
        //obtener lista de vehiculos desde el back
        setUsuarios(usuariosBackend);
    }, []);

    //si mostrar tabla es true, pongale al texto del boton crear nuevo usuario, sino mostrar usuarios
    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear nuevo usuario');
        }
        else {
            setTextoBoton('Mostrar todos los usuarios');
        }
    }, [mostrarTabla]);

    return (
        <section className='fondoGris'>
            <Descripcion
                titulo={titulo}
                cuerpo={cuerpo}
                //modal={modal}
            />
            <section className='bg-white rounded m-4 p-4 d-flex justify-content-center row  h-100 ' >

                <button className='btn btn-agregar col-lg-12 h-15 w-25 '
                    onClick={() => { setMostrarTabla(!mostrarTabla); }}>{textoBoton}</button>

                {/* con set cambiamos el estado cada que se le da click */
                /*Si mostrar tabla es true, entonces se muestra tabla usuarios
                sino, se muestra formulario creacion usuarios*/ }

                {mostrarTabla ? (<TablaUsuarios listaUsuarios={usuarios} />
                ) : (<FormularioCreacionUsuarios funcionParaMostrarLaTabla={setMostrarTabla}
                    listaUsuarios={usuarios}
                    funcionParaAgregarUnUsuario={setUsuarios} />
                )}

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                />
            </section>

        </section>

    );
};
const TablaUsuarios = ({ listaUsuarios }) => {

    useEffect(() => {
        console.log('este es el estado de los usuarios en el componente de la tabla: ', listaUsuarios);
    }, [listaUsuarios]);

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

            {listaUsuarios.map((usuario) => {
                return (
                    <tr>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.contraseña}</td>
                        <td>{usuario.rol}</td>
                        <td>{usuario.celular}</td>
                    </tr>

                )

            })}
            {/* <tr>
                    <td>maria</td>
                    <td>123</td>
                    <td>usuario</td>
                    <td>321321321</td> 
                </tr> */}
        </tbody>
    </table>


};

const FormularioCreacionUsuarios = ({ funcionParaMostrarLaTabla, listaUsuarios, funcionParaAgregarUnUsuario }) => {

    const form = useRef(null);

    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);
       
        const nuevoUsuario = {};
        fd.forEach((value,key)=>{
            nuevoUsuario[key]=value;
        });
        funcionParaMostrarLaTabla(true);
        toast.success("Usuario agregado con éxito")

        //con spread operator "..." dice que tome todo lo que haya en lista usuarios
        //y que le añada lo que haya en nuevo usuario, osea otro registro.
        funcionParaAgregarUnUsuario([...listaUsuarios,nuevoUsuario]);

    };



    return <div className='d-flex row'>
        <div><h2>Crear nuevo usuario</h2></div>
        <div>
            <form ref={form} onSubmit={submitForm} className='form-group col-sm-2 align-items-center'>
                <label htmlFor='nombre'>Nombre
                    <input  className='o-input-usuarios rounded' name='nombre' type='text' placeholder='Sara Sofia'
                        required />
                </label>

                <label htmlFor='contrasena'>Contraseña
                    <input className='o-input-usuarios rounded ' name='contrasena' type='password' placeholder='1sd78cafe'
                        required />
                </label>

                <label htmlFor='rolusuario' >Rol
                    <select 
                        name='rolusuario' className='o-input-usuarios rounded' required>
                        <option disabled selected="selected">Seleccione una opción</option>
                        <option>Administrador</option>
                        <option>Vendedor</option>
                        <option>Usuario</option>
                    </select>
                </label>

                <label htmlFor='celular'>Celular
                    <input className='o-input-usuarios rounded ' name='celular' type='number' placeholder='316547810'
                        required />
                </label>
                <button type='submit' className='btn btn-danger'  >Guardar Usuario</button>
            </form>
        </div>
    </div>;
};



{/* <Tabla
                tipo='usuario'
                headers={headers}
                data={data} /> */}
export default Usuarios
