import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { obtenerDatosUsuarios } from "utils/api";

const PrivateRoutes = ({ children }) => {
  const {
    //user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    const fetchAuth0Token = async () => {
      //Esto es para si se quieren hacer validaciones
      //       if (localStorage.getItem('token')){
      //         //validar fecha de expiracion del token
      //       }else{
      // //pedir token
      //       }

      //PASO 1. PEDIR TOKEN A AUTH0
      const accessToken =
        await getAccessTokenSilently({
        audience: `api-autenticacion-figuras-mintic`, 
        });
      
      // PASO 2. RECIBIR TOKEN DE AUTH0
      localStorage.setItem("token", accessToken);
      console.log("este es el token ", accessToken);

      //PASO 3. ENVIARLE EL TOKEN AL BACKEND, primero con api.js y luego a server.js 
      //cuando se inicia sesion se llama a una ruta en server.js
      await obtenerDatosUsuarios((response) => {
        console.log("respuesta. Datos del usuario logeado ", response)
      }, (err) => {
        //console.log("error ", err)
      })
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return (<div>
      <Spinner animation="border" />
      <span >Loading...</span>
    </div>)
  };

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <div className="text-danger">No estas autorizado para ver este sitio</div>
  );
  <Link to="/">Ir al home</Link>;
};

export default PrivateRoutes;
