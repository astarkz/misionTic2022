import React from 'react'
import Publicnavbar from '../components/navbarpublic/Publicnavbar';



const Publiclayout = ({children}) => {
    return (
        <div className="d-flex row justify-content-between bg-warning">
            <Publicnavbar/>
            <main className="fondoGris">{children}</main>
      
        </div>
    )
}

export default Publiclayout;

