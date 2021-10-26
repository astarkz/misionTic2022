import React from 'react'
import Login from 'Pages/Login'

const Authlayout = ({children}) => {
    return (
        <div className='d-flex flex-row justify-content-center align-items-center' style={{height: "100vh"}}
        >
            
           <div>{children}</div>
        </div>
    )
}

export default Authlayout
