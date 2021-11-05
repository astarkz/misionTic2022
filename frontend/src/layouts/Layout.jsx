import React from 'react'
import Header from 'components/header/Header'
import Navbar from 'components/navbar/Navbar'
import PrivateRoutes from 'components/privateroutes/PrivateRoutes'

const Layout = ({children}) => {
    return (
        <PrivateRoutes>
        <div className="mainContainer">
            <Header/>
            <Navbar/>
            <main>{children}</main>
        </div>
        </PrivateRoutes>
    )
}

export default Layout
