import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const {
    user,
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

      const accessToken = await getAccessTokenSilently({
        audience: `api-autenticacion-figuras-mintic`,
      });
      localStorage.setItem("token", accessToken);
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <div className="text-danger">No estas autorizado para ver este sitio</div>
  );
  <Link to="/">Ir al home</Link>;
};

export default PrivateRoutes;
