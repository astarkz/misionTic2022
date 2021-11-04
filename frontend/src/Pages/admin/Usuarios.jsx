import React from 'react'
import Descripcion from 'components/descripcion/Descripcion'
import Tabla from 'components/tabla/Tabla';
import 'Pages/styles.css';
import descripcion from 'datasource/descripcion.json'
import modalInfo from 'datasource/modalInfo.json'
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'Pages/styles.css'
import { nanoid } from 'nanoid';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import { obtenerUsuarios } from 'utils/api';


const Usuarios = () => {
    let [titulo, cuerpo] = Object.values(descripcion[2])
    let modal = modalInfo[2]

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);


    
    useEffect(() => {
        
        if (ejecutarConsulta) {
            obtenerUsuarios(setUsuarios,setEjecutarConsulta);
                            }
    }, [ejecutarConsulta]);

    //use effect vacio para traer los datos del backend

    useEffect(() => {
        //obtener lista de usuarios desde el backend
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);

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
            <section className='bg-white rounded m-4 p-4 d-flex flex-column align-items-center col  h-100 ' >

                <div>
                    <button className='btn btn-danger w-100 '
                        onClick={() => { setMostrarTabla(!mostrarTabla); }}>{textoBoton}</button>
                </div>

                {/* con set cambiamos el estado cada que se le da click */
                /*Si mostrar tabla es true, entonces se muestra tabla usuarios
                sino, se muestra formulario creacion usuarios*/ }

                <div className="tabla_grande" >
                    {mostrarTabla ? (<TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
                    ) :
                        (<FormularioCreacionUsuarios
                            setMostrarTabla={setMostrarTabla}
                            listaUsuarios={usuarios}
                            setUsuarios={setUsuarios} />
                        )}

                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                    />

                </div>
            </section>

        </section>

    );
};
const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
    const form = useRef(null);

    useEffect(() => {
        console.log('este es el estado de los usuarios en el componente de la tabla: ', listaUsuarios);
    }, [listaUsuarios]);

    return (<div>
        <table className="tabla_grande">
            <thead>
                <tr>
                    <th>ID usuario</th>
                    <th>Nombre completo</th>
                    <th>Contraseña</th>
                    <th>Rol</th>
                    <th>Celular</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listaUsuarios.map((usuario) => {
                    return (<FilaUsuario key={nanoid()} usuario={usuario} setEjecutarConsulta={setEjecutarConsulta} />
                    )
                })}
            </tbody>
        </table>
    </div>)
};
const FilaUsuario = ({ usuario, setEjecutarConsulta }) => {

    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
        _id: usuario._id,
        name: usuario.name,
        password: usuario.password,
        rol: usuario.rol,
        cel: usuario.cel,
    });
    // ACTUALIZAR USUARIO ------------------------------
    const actualizarUsuario = async () => {
        //enviar la info al backend
        const options = {
            method: 'PATCH',
            url: 'http://localhost:5000/usuarios/editar',
            headers: { 'Content-Type': 'application/json' },
            data: { ...infoNuevoUsuario, id: usuario._id },
        };
        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Usuario modificado con éxito');
                setEdit(false);
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                toast.error('Error modificando el usuario');
                console.error(error);
            });
    };

    //BORRAR USUARIO ---------------------------------
    const eliminarUsuario = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/usuarios/eliminar',
            headers: { 'Content-Type': 'application/json' },
            data: { id: usuario._id },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Usuario eliminado con éxito');
                setEjecutarConsulta(true);               
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error eliminando el usuario');
            });
    };

    return (
        <tr >
            {edit ? (
                <>
                    <td>{infoNuevoUsuario._id}</td>
                    <td>
                        <input type='text' value={infoNuevoUsuario.name}
                            onChange={e => setInfoNuevoUsuario({ ...infoNuevoUsuario, name: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='password' value={infoNuevoUsuario.password}
                            onChange={e => setInfoNuevoUsuario({ ...infoNuevoUsuario, password: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='text' value={infoNuevoUsuario.rol}
                            onChange={e => setInfoNuevoUsuario({ ...infoNuevoUsuario, rol: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='number' value={infoNuevoUsuario.cel}
                            onChange={e => setInfoNuevoUsuario({ ...infoNuevoUsuario, cel: e.target.value })}
                        />
                    </td>
                </>
            ) : (
                    <>
                        <td>{usuario._id}</td>
                        <td>{usuario.name}</td>
                        <td>{usuario.password}</td>
                        <td>{usuario.rol}</td>
                        <td>{usuario.cel}</td>
                    </>
            )}

            <td>
                <div className='d-flex w-100 justify-content-around'>
                    {edit ? (
                        <>
                            <Tooltip title='Confirmar edición' arrow>
                                <i
                                    onClick={() => actualizarUsuario()}
                                    className='fas fa-check text-success'
                                />
                            </Tooltip>

                            <Tooltip title='Cancelar edición' arrow>
                                <i
                                    onClick={() => setEdit(!edit)} className='fas fa-ban'
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title='Editar usuario' arrow>
                                <i
                                    onClick={() => setEdit(!edit)} className='fas fa-pencil-alt'
                                />
                            </Tooltip>

                            <Tooltip title='Eliminar usuario' arrow>
                                <i onClick={() => setOpenDialog(true)} className='fas fa-trash' />
                            </Tooltip>
                        </>
                    )}
                </div>
                <Dialog open={openDialog}>
                    <div>
                        <h1 className='text-danger w-100'>¿Esta seguro de querer eliminar el usuario??</h1>
                        <button onClick={() => eliminarUsuario()} className='btn btn-danger m-2 '>Sí</button>
                        <button onClick={() => setOpenDialog(false)} className='btn btn-light m-2'>No</button>
                    </div>
                </Dialog>
            </td>
        </tr>

    );
};

const FormularioCreacionUsuarios = ({ setMostrarTabla, listaUsuarios, setUsuarios }) => {

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();

        const fd = new FormData(form.current);
        const nuevoUsuario = {};
        fd.forEach((value, key) => {
            nuevoUsuario[key] = value;
            console.log("esto son la informacion del nuevo usuario ", nuevoUsuario);
        });

        const options = {
            method: 'POST',
            url: 'http://localhost:5000/usuarios/nuevo',
            headers: { 'Content-Type': 'application/json' },
            data: {
                name: nuevoUsuario.name, password: nuevoUsuario.password, rol: nuevoUsuario.rol
                , cel: nuevoUsuario.cel
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Usuario agregado con éxito');
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error creando un usuario');
            });

        setMostrarTabla(true);

        //con spread operator "..." dice que tome todo lo que haya en lista usuarios y que le añada lo que haya en nuevo usuario, osea otro registro.
        setUsuarios([...listaUsuarios, nuevoUsuario]);

    };

    return <div className='d-flex flex-column w-100 align-items-center'>
        <div><h2>Crear nuevo usuario</h2></div>
        <div className="o-forms-user">
            <form ref={form} onSubmit={submitForm} className='form-group o-forms-style'>
                <label htmlFor='name'>Nombre
                    <input className='o-input-usuarios rounded' name='name' type='text' placeholder='Pepito Perez'
                        required />
                </label>

                <label htmlFor='password'>Contraseña
                    <input className='o-input-usuarios rounded ' name='password' type='password' placeholder='1sd78cafe'
                        required />
                </label>

                <label htmlFor='rol' >Rol
                    <select
                        name='rol' className='o-input-usuarios rounded' placeholder='usuario' required>
                        <option disabled defaultValue>Seleccione una opción</option>
                        <option>Administrador</option>
                        <option>Vendedor</option>
                        <option>Usuario</option>
                    </select>
                </label>

                <label htmlFor='cel'>Celular
                    <input className='o-input-usuarios rounded ' name='cel' type='number' placeholder='316547810'
                        required />
                </label>
                <button type='submit' className='btn btn-danger'  >Guardar Usuario</button>
            </form>
        </div>
    </div>;
};

export default Usuarios
