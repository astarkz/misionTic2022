
import axios from "axios";

export const obtenerUsuarios = async (setUsuarios,setEjecutarConsulta) => {
    const options = { method: 'GET', url: 'http://localhost:5000/usuarios' };
    await axios
        .request(options)
        .then(function (response) {
            setUsuarios(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
        setEjecutarConsulta(false);
};

export const obtenerVendedores = async (setVendedores, setEjecutarConsulta) => {
    const options = { method: 'GET', url: 'http://localhost:5000/Vendedores' };
    await axios
        .request(options)
        .then(function (response) {
            setVendedores(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    setEjecutarConsulta(false);
};