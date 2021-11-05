import React from 'react'
import {useAuth0} from '@auth0/auth0-react';
import{Link} from 'react-router-dom';

const PrivateRoutes = ({children}) => {

    const {user, isAuthenticated,isLoading} = useAuth0();

   if (isLoading) return <div>Loading...</div>;

   return isAuthenticated ? <>{children}</>:
   
   <div className='text-danger'>No estas autorizado para ver este sitio</div>;
   <Link to='/'>Ir al home</Link>
};

export default PrivateRoutes
