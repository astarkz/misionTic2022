import React from 'react'
import Header from '../components/header/Header'
import Navbar from '../components/navbar/Navbar'

const Layout = ({children}) => {
    return (
        <div>
            <Header/>
            <Navbar/>
            <main>{children}</main>
        </div>
    )
}

export default Layout
