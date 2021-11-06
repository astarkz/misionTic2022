import axios from "axios";

//metodo para tomar el token del localStorage
const getToken = () => {
  return `Bearer ${localStorage.getItem("token")}`;
};

export const obtenerUsuarios = async (setUsuarios, setEjecutarConsulta) => {
  const options = { method: "GET", url: "http://localhost:5000/usuarios",
//se añade este headers en todos los metodos(GET,POST,PATCH Y DELETE) 
//Nota: los get estan en Utils.api
//el resto de metodos estan en cada pagina, ejemplo : Usuarios, ventas, vendedores
//en cada page ya esta creado el headers, entonces se debe añadir el Authorization:getToken(),
  headers:{
    Authorization: getToken(),
},
};
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

// PASO 3. ENVIAR EL TOKEN A AUTH0 (SERVER.JS)
export const obtenerDatosUsuarios = async (setUsuarios, setEjecutarConsulta) => {
  const options = {
    method: "GET", url: "http://localhost:5000/usuarios/self", //ruta dummy
    headers: {
      //authorization continene el token con toda la info del user
      Authorization: getToken(),
    },
  };
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
  const options = { method: "GET", url: "http://localhost:5000/Vendedores",
  headers:{
    Authorization: getToken(),
},};
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

export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
  const options = { method: "GET", url: "http://localhost:5000/Ventas",
  headers:{
    Authorization: getToken(),
}, };
  await axios
    .request(options)
    .then(function (response) {
      setVentas(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};
