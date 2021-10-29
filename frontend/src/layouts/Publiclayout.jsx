import React from 'react'
import Publicnavbar from '../components/navbarpublic/Publicnavbar';



const Publiclayout = ({children}) => {
    return (
        <>
            <Publicnavbar />
            <main className="fondoGris">{children}</main>
        </>
    )
}

export default Publiclayout;

