import React from 'react'
import Publicnavbar from '../components/navbarpublic/Publicnavbar';
import Publicfooter from '../components/footerpublic/Publicfooter';


const Publiclayout = ({children}) => {
    return (
        <div className="d-flex row justify-content-between bg-warning">
            <Publicnavbar/>
            <main className="h-100 ">{children}</main>
            <Publicfooter/>
        </div>
    )
}

export default Publiclayout;

