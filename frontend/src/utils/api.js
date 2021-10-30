
import axios from "axios";

export const obtenerUsuarios = async (setUsuarios,setEjecutarConsulta) => {
    const options = { method: 'GET', url: 'https://vast-waters-45728.herokuapp.com/vehicle/' };
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