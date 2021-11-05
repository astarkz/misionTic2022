import React from 'react'
import 'Pages/styles.css';
import descripcion from 'datasource/descripcion.json'
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'Pages/styles.css'
import { nanoid } from 'nanoid';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import { obtenerVendedores } from 'utils/api';
import Form from 'react-bootstrap/Form'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

const getToken = () => {
    return `Bearer ${localStorage.getItem("token")}`;
  };

const Vendedores = () => {
    let [titulo, cuerpo] = Object.values(descripcion[1])

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [Vendedores, setVendedores] = useState([]);
    const [textoBoton, setTextoBoton] = useState('');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    const [colorBoton, setColorBoton] = useState('danger');
    
    useEffect(() => {        
        if (ejecutarConsulta) {
                obtenerVendedores(setVendedores, setEjecutarConsulta);
        }
    }, [ejecutarConsulta]); //use effect vacio para traer los datos del backend

    useEffect(() => {
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear nuevo vendedor');
            setColorBoton('danger');
        } else {
            setTextoBoton('Mostrar tabla de vendedores');
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
                        <Button className="p-4  rounded-circle" roundedCircle variant={colorBoton}
                        onClick={() => { setMostrarTabla(!mostrarTabla); }}>{textoBoton}</Button>
                    </div>
                </section>
                
            <section className= 'bg-white rounded m-4 p-4 d-flex flex-column align-items-center col  h-100 ' >                    
                    <div className="tabla_grande" >
                    {mostrarTabla ? (<TablaVendedores listaVendedores={Vendedores} setEjecutarConsulta={setEjecutarConsulta} />
                    ) :
                        (<FormularioCreacionVendedores
                            setMostrarTabla={setMostrarTabla}
                            listaVendedores={Vendedores}
                            setVendedores={setVendedores} />
                        )}
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                    />
                </div>
            </section>

        </section>

            );
}

const TablaVendedores = ({ listaVendedores, setEjecutarConsulta }) => {
    const form = useRef(null);

    useEffect(() => {
        console.log('este es el estado de los Vendedores en el componente de la tabla: ', listaVendedores);
    }, [listaVendedores]);

    return <div className="p-3" >
        <div>
            <h2>Registro de vendedores</h2>
        </div>
        <table className="tabla_grande" >       
            <thead>
                <tr>
                    <th>ID vendedor</th>
                    <th>Nombre completo</th>
                    <th>Especialidad</th>
                    <th>Celular</th>
                    <th>Fecha ingreso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listaVendedores.map((Vendedor) => {
                    return (<FilaVendedor key={nanoid()} Vendedor={Vendedor} setEjecutarConsulta={setEjecutarConsulta} />
                    )
                })}
            </tbody>
        </table>
    </div>
};

const FilaVendedor = ({ Vendedor, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevoVendedor, setInfoNuevoVendedor] = useState({
        _id: Vendedor._id,
        name: Vendedor.name,
        especialidad: Vendedor.especialidad,
        celular: Vendedor.celular,
        fecha_ingreso: Vendedor.fecha_ingreso,
    });
    // ACTUALIZAR Vendedor ------------------------------
    const actualizarVendedor = async () => {
        //enviar la info al backend
        const options = {
            method: 'PATCH',
            url: 'http://localhost:5000/Vendedores/editar',
            headers: { 'Content-Type': 'application/json',Authorization: getToken(), },
            data: { ...infoNuevoVendedor, id: Vendedor._id },
        };
        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Vendedor modificado con éxito');
                setEdit(false);
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                toast.error('Error modificando el Vendedor');
                console.error(error);
            });
    };
    //BORRAR Vendedor ---------------------------------
    const eliminarVendedor = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/Vendedores/eliminar',
            headers: { 'Content-Type': 'application/json' ,Authorization: getToken(),},
            data: { id: Vendedor._id },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Vendedor eliminado con éxito');
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error eliminando el vendedor');
            });
    };

    return (
        <tr >
            {edit ? (
                <>
                    <td>{infoNuevoVendedor._id}</td>
                    <td>
                        <input type='text' value={infoNuevoVendedor.name}
                            onChange={e => setInfoNuevoVendedor({ ...infoNuevoVendedor, name: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='especialidad' value={infoNuevoVendedor.especialidad}
                            onChange={e => setInfoNuevoVendedor({ ...infoNuevoVendedor, especialidad: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='text' value={infoNuevoVendedor.celular}
                            onChange={e => setInfoNuevoVendedor({ ...infoNuevoVendedor, celular: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='text' value={infoNuevoVendedor.fecha_ingreso}
                            onChange={e => setInfoNuevoVendedor({ ...infoNuevoVendedor, fecha_ingreso: e.target.value })}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{Vendedor._id}</td>
                    <td>{Vendedor.name}</td>
                    <td>{Vendedor.especialidad}</td>
                    <td>{Vendedor.celular}</td>
                    <td>{Vendedor.fecha_ingreso}</td>
                </>
            )}

            <td>
                <div className='d-flex w-100 justify-content-around'>

                    {edit ? (
                        <>
                            <Tooltip title='Confirmar edición' arrow>
                                <i
                                    onClick={() => actualizarVendedor()}
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
                            <Tooltip title='Editar Vendedor' arrow>
                                <i
                                    onClick={() => setEdit(!edit)} className='fas fa-pencil-alt text-primary'
                                />
                            </Tooltip>

                            <Tooltip title='Eliminar Vendedor' arrow>
                                <i onClick={() => setOpenDialog(true)} className='fas fa-trash text-danger' />
                            </Tooltip>
                        </>
                    )}
                </div>
                <Dialog open={openDialog}>
                    <div>
                        <h1 className='text-danger w-100'>¿Esta seguro de querer eliminar el vendedor??</h1>
                        <button onClick={() => eliminarVendedor()} className='btn btn-danger m-2 '>Sí</button>
                        <button onClick={() => setOpenDialog(false)} className='btn btn-light m-2'>No</button>
                    </div>
                </Dialog>
            </td>
        </tr>

    );
};

const FormularioCreacionVendedores = ({ setMostrarTabla, listaVendedores, setVendedores }) => {

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();

        const fd = new FormData(form.current);
        const nuevoVendedor = {};
        fd.forEach((value, key) => {
            nuevoVendedor[key] = value;
            console.log("esto son la informacion del nuevo Vendedor ", nuevoVendedor);
        });

        const options = {
            method: 'POST',
            url: 'http://localhost:5000/Vendedores/nuevo',
            headers: { 'Content-Type': 'application/json',Authorization: getToken(), },
            data: {
                name: nuevoVendedor.name, especialidad: nuevoVendedor.especialidad, celular: nuevoVendedor.celular
                , fecha_ingreso: nuevoVendedor.fecha_ingreso
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Vendedor agregado con éxito');
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error creando un Vendedor');
            });

        setMostrarTabla(true);

        //con spread operator "..." dice que tome todo lo que haya en lista Vendedores y que le añada lo que haya en nuevo Vendedor, osea otro registro.
        setVendedores([...listaVendedores, nuevoVendedor]);

    };

    return <div className='d-flex flex-column w-100 align-items-center'>
        <div className="m-3"><h2>Crear nuevo vendedor</h2></div>
        <Form className='d-flex flex-column w-50 align-items-left' ref={form} onSubmit={submitForm} >
                            
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} htmlFor='name'> Nombre completo </Form.Label>
                <Col sm={9}>
                    <Form.Control name='name' type='text' placeholder='Ingresa tu nombre aqui' required/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={3} htmlFor='especialidad'> Especialidad </Form.Label>
                <Col sm={9}>
                    <Form.Select name='especialidad' required>
                        <option value="Ninguno" disabled >Seleccione una opción</option>
                        <option value="DC">Figuras de colección DC</option>
                        <option value="Marvel">Figuras de colección Marvel</option>
                        <option value="Otras">Otras figuras de colección</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={3} htmlFor='celular'> Celular </Form.Label>
                <Col sm={9}>
                    <Form.Control name='celular' type='phone' placeholder='Ingresa tu telefono aqui' required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} htmlFor='fecha_ingreso'> Fecha de ingreso </Form.Label>
                <Col sm={9}>
                    <Form.Control name='fecha_ingreso' type='date' placeholder='dd/mm/aaaa' required  />
                </Col>
            </Form.Group>

            <button type='submit' className='btn btn-danger'  >Guardar Vendedor</button>            
        </Form>
    </div>;
};

export default Vendedores
