import React from 'react'
import Login from 'Pages/Login'

const Authlayout = ({children}) => {
    return (
        <div className='d-flex flex-row'>
            layout de autenticacion
           <div>{children}</div>
        </div>
    )
}

export default Authlayout
