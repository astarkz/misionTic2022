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
import { obtenerVentas } from 'utils/api';
import Form from 'react-bootstrap/Form'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

const getToken = () => {
    return `Bearer ${localStorage.getItem("token")}`;
  };

const Ventas = () => {
    let [titulo, cuerpo] = Object.values(descripcion[0])

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [Ventas, setVentas] = useState([]);
    const [textoBoton, setTextoBoton] = useState('');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    const [colorBoton, setColorBoton] = useState('danger');

    useEffect(() => {
        if (ejecutarConsulta) {
            obtenerVentas(setVentas, setEjecutarConsulta);
        }
    }, [ejecutarConsulta]); //use effect vacio para traer los datos del backend

    useEffect(() => {
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear nueva venta');
            setColorBoton('danger');
        } else {
            setTextoBoton('Mostrar tabla de ventas');
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
                    <Button className="p-4  rounded-circle"  variant={colorBoton}
                        onClick={() => { setMostrarTabla(!mostrarTabla); }}>{textoBoton}</Button>
                </div>
            </section>

            <section className='bg-white rounded m-4 p-4 d-flex flex-column align-items-center col  h-100 ' >
                <div className="tabla_grande" >
                    {mostrarTabla ? (<TablaVentas listaVentas={Ventas} setEjecutarConsulta={setEjecutarConsulta} />
                    ) :
                        (<FormularioCreacionVentas
                            setMostrarTabla={setMostrarTabla}
                            listaVentas={Ventas}
                            setVentas={setVentas} />
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

const TablaVentas = ({ listaVentas, setEjecutarConsulta }) => {
    //const form = useRef(null);

    useEffect(() => {
        console.log('Estado de las ventas en el componente de la tabla: ', listaVentas);
    }, [listaVentas]);

    return <div className="p-3" >
        <div>
            <h2>Registro de ventas</h2>
        </div>
        <table className="tabla_grande" >
            <thead>
                <tr>
                    <th>ID venta</th>
                    <th>Descripción</th>
                    <th>Valor total venta</th>
                    <th>Fecha inicial</th>
                    <th>Fecha de pago</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listaVentas.map((Venta) => {
                    return (<FilaVenta key={nanoid()} Venta={Venta} setEjecutarConsulta={setEjecutarConsulta} />
                    )
                })}
            </tbody>
        </table>
    </div>
};

const FilaVenta = ({ Venta, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState({
        _id: Venta._id,
        descripcion: Venta.descripcion,
        valor_total_venta: Venta.valor_total_venta,
        fecha_inicial: Venta.fecha_inicial,
        fecha_pago: Venta.fecha_pago,
    });
    // ACTUALIZAR Venta ------------------------------
    const actualizarVenta = async () => {
        //enviar la info al backend
        const options = {
            method: 'PATCH',
            url: 'http://localhost:5000/Ventas/editar',
            headers: { 'Content-Type': 'application/json' ,Authorization: getToken(),},
            data: { ...infoNuevaVenta, id: Venta._id },
        };
        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Venta modificado con éxito');
                setEdit(false);
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                toast.error('Error modificando el Venta');
                console.error(error);
            });
    };
    //BORRAR Venta ---------------------------------
    const eliminarVenta = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/Ventas/eliminar',
            headers: { 'Content-Type': 'application/json',Authorization: getToken(), },
            data: { id: Venta._id },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Venta eliminado con éxito');
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error eliminando el venta');
            });
    };

    return (
        <tr >
            {edit ? (
                <>
                    <td>{infoNuevaVenta._id}</td>
                    <td>
                        <input type='text' value={infoNuevaVenta.descripcion}
                            onChange={e => setInfoNuevaVenta({ ...infoNuevaVenta, descripcion: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='valor_total_venta' value={infoNuevaVenta.valor_total_venta}
                            onChange={e => setInfoNuevaVenta({ ...infoNuevaVenta, valor_total_venta: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='text' value={infoNuevaVenta.fecha_inicial}
                            onChange={e => setInfoNuevaVenta({ ...infoNuevaVenta, fecha_inicial: e.target.value })}
                        />
                    </td>
                    <td>
                        <input type='text' value={infoNuevaVenta.fecha_pago}
                            onChange={e => setInfoNuevaVenta({ ...infoNuevaVenta, fecha_pago: e.target.value })}
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{Venta._id}</td>
                    <td>{Venta.descripcion}</td>
                    <td>{Venta.valor_total_venta}</td>
                    <td>{Venta.fecha_inicial}</td>
                    <td>{Venta.fecha_pago}</td>
                </>
            )}

            <td>
                <div className='d-flex w-100 justify-content-around'>

                    {edit ? (
                        <>
                            <Tooltip title='Confirmar edición' arrow>
                                <i
                                    onClick={() => actualizarVenta()}
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
                            <Tooltip title='Editar Venta' arrow>
                                <i
                                    onClick={() => setEdit(!edit)} className='fas fa-pencil-alt text-primary'
                                />
                            </Tooltip>

                            <Tooltip title='Eliminar Venta' arrow>
                                <i onClick={() => setOpenDialog(true)} className='fas fa-trash text-danger' />
                            </Tooltip>
                        </>
                    )}
                </div>
                <Dialog open={openDialog}>
                    <div className='d-flex flex-column'>
                        <h1 className='text-danger w-100'>¿Esta seguro de querer eliminar el venta??</h1>
                        <button onClick={() => eliminarVenta()} className='btn btn-danger m-2 '>Sí</button>
                        <button onClick={() => setOpenDialog(false)} className='btn btn-light m-2'>No</button>
                    </div>
                </Dialog>
            </td>
        </tr>

    );
};

const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {

    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();

        const fd = new FormData(form.current);
        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
            console.log("esto son la informacion de la nueva venta ", nuevaVenta);
        });

        const options = {
            method: 'POST',
            url: 'http://localhost:5000/Ventas/nueva',
            headers: { 'Content-Type': 'application/json',Authorization: getToken(), },
            data: {
                descripcion: nuevaVenta.descripcion, valor_total_venta: nuevaVenta.valor_total_venta, fecha_inicial: nuevaVenta.fecha_inicial
                , fecha_pago: nuevaVenta.fecha_pago
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Venta agregado con éxito');
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error creando un Venta');
            });

        setMostrarTabla(true);

        //con spread operator "..." dice que tome todo lo que haya en lista Ventas y que le añada lo que haya en nueva Venta, osea otro registro.
        setVentas([...listaVentas, nuevaVenta]);

    };

    return <div className='d-flex flex-column w-100 align-items-center'>
        <div className="m-3"><h2>Crear nueva venta</h2></div>
        <Form className='d-flex flex-column w-50 align-items-left' ref={form} onSubmit={submitForm} >

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} htmlFor='descripcion'> Descripción de la venta </Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea"  name='descripcion' type='text' placeholder='Ingresa la descripción de los artículos vendidos' required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={3} htmlFor='valor_total_venta'> Valor total venta </Form.Label>
                <Col sm={9}>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)" name='valor_total_venta' type='number' min="0" step="any" placeholder='Ingresa el valor total de la venta' required />
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm={3} htmlFor='fecha_inicial'> Fecha inicial </Form.Label>
                <Col sm={9}>
                    <Form.Control name='fecha_inicial' type='date' placeholder='dd/mm/aaaa' required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} htmlFor='fecha_pago'> Fecha de pago </Form.Label>
                <Col sm={9}>
                    <Form.Control name='fecha_pago' type='date' placeholder='dd/mm/aaaa' required />
                </Col>
            </Form.Group>

            <button type='submit' className='btn btn-danger' >Guardar Venta</button>
        </Form>
    </div>;
};

export default Ventas;