import React from 'react'
import 'components/descripcion/descripcion.css'
import 'Pages/styles.css';
import descripcion from 'datasource/descripcion.json'
//import modalInfo from 'datasource/modalInfo.json'
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify'; //Toast error and sucessfull
import 'react-toastify/dist/ReactToastify.css'
import 'Pages/styles.css'
import { nanoid } from 'nanoid'; //Nano id
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip'; //material UI tooltip
import Dialog from '@mui/material/Dialog';  //Material UI modal
import { obtenerUsuarios } from 'utils/api';
import Form from 'react-bootstrap/Form'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ReactLoading from 'react-loading';

//metodo para obtener el token del localStorage
const getToken = () => {
    return `Bearer ${localStorage.getItem("token")}`;
    };
const Usuarios = () => {
    let [titulo, cuerpo] = Object.values(descripcion[2])

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    const [colorBoton, setColorBoton] = useState('danger');
    const [loading,setLoading] = useState(false);
    
    useEffect(() => {
        
        setLoading(false);
        
        if (ejecutarConsulta) {
            obtenerUsuarios(setUsuarios,setEjecutarConsulta);
            setLoading(false);        
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
            setColorBoton('danger');
        }
        else {
            setTextoBoton('Mostrar lista de usuarios');
            setColorBoton('outline-danger');
        }
    }, [mostrarTabla]);

    return (
        <section className='fondoGris'>
            <section className="o-container-description">
                <section className="o-description-text">
                    <h1>{titulo}</h1>
                    <p>{cuerpo}</p>
                </section>
                <div className='w-50 justify-content-end'>
                    <Button className="p-4  rounded-circle" variant={colorBoton}
                        onClick={() => { setMostrarTabla(!mostrarTabla); }}>{textoBoton}</Button>
                </div>
            </section>
            
            <section className='bg-white rounded m-4 p-4 d-flex flex-column align-items-center col  h-100 '>

                {/*
                <div>
                    <button className='btn btn-danger w-100 '
                        onClick={() => { setMostrarTabla(!mostrarTabla); }}>{textoBoton}</button>
                </div>
                 con set cambiamos el estado cada que se le da click */
                /*Si mostrar tabla es true, entonces se muestra tabla usuarios
                sino, se muestra formulario creacion usuarios*/ }

                <div className="tabla_grande" >

                    {mostrarTabla ? (<TablaUsuarios loading={loading} listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
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
const TablaUsuarios = ({ loading, listaUsuarios, setEjecutarConsulta }) => {
    //const form = useRef(null);

    useEffect(() => {
        console.log('Estado de los usuarios en el componente de la tabla: ', listaUsuarios);
    }, [listaUsuarios]);

    return (<div>
        {loading ?(<ReactLoading type ="cylon" color="abc123" height={667} with={375}/>
        ) : (
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
        )}
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
            headers: { 'Content-Type': 'application/json',Authorization: getToken(), },
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
            headers: { 'Content-Type': 'application/json',Authorization: getToken(), },
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
                                    onClick={() => setEdit(!edit)} className='fas fa-ban text-danger'
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title='Editar usuario' arrow>
                                <i
                                    onClick={() => setEdit(!edit)} className='fas fa-pencil-alt text-primary'
                                />
                            </Tooltip>

                            <Tooltip title='Eliminar usuario' arrow>
                                <i onClick={() => setOpenDialog(true)} className='fas fa-trash text-danger' />
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
            headers: { 'Content-Type': 'application/json',Authorization: getToken() },
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
        <div className="m-3"><h2>Crear nuevo usuario</h2></div>
        <Form className='d-flex flex-column w-50 align-items-left' ref={form} onSubmit={submitForm} >
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} htmlFor='name'> Nombre completo </Form.Label>
                <Col sm={9}>
                    <Form.Control name='name' type='text' placeholder='Ingresa tu nombre aqui' required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} htmlFor='name'> Contraseña </Form.Label>
                <Col sm={9}>
                    <Form.Control name='password' type='password' placeholder='Ingresa tu contraseña' required />
                    <Form.Text className="text-muted">
                        Nunca compartas tu contraseña con nadie.
                    </Form.Text>
                </Col>                
            </Form.Group>

            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={3} htmlFor='rol'> Rol </Form.Label>
                <Col sm={9}>
                    <Form.Select name='rol' required>
                        <option value="Ninguno" disabled >Seleccione una opción</option>
                        <option value="Usuario">Usuario</option>
                        <option value="Vendedor">Vendedor</option>                        
                        <option value="Administrador">Administrador</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} htmlFor='cel'> Celular </Form.Label>
                <Col sm={9}>
                    <Form.Control name='cel' type='number' placeholder='Ingresa tu telefono celular' required />
                </Col>
            </Form.Group>
                <button type='submit' className='btn btn-danger'  >Guardar Usuario</button>
            </Form>
    </div>;
};

export default Usuarios
