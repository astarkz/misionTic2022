import React from 'react'
import Login from 'Pages/Login'

const Authlayout = ({children}) => {
    return (
        <div>
            layout de autenticacion
           <main>{children}</main>
        </div>
    )
}

export default Authlayout
