import React from 'react'
import './styles.css'
import MiCard from 'components/miCard/MiCard'
import capitan from 'img/fotos_juguetes/capitan.jpg'
import ironMan from 'img/fotos_juguetes/iron.jpg'
import spiderMan from 'img/fotos_juguetes/spider.jpg'
import hulk from 'img/fotos_juguetes/hulk.jpg'
import capitana from 'img/fotos_juguetes/lainutil.jpg'
import halcon from 'img/fotos_juguetes/halcon.jpg'
import antman from 'img/fotos_juguetes/antman.jpg'
import groot from 'img/fotos_juguetes/grood.jpg'

const Index = () => {
    return (
        <div className="fondoGris contenedorCard">
            <MiCard titulo="Capitán América" descripcion="Hero Collector Marvel Heavyweight Collection | Capitán América (Avengers: Endgame)" imagen={capitan} textoBtn="Añadir al carrito" />
            <MiCard titulo="Iron Man" descripcion="Hero Collector Colección Marvel Pesos Pesados | Figura de Metal Pesado Iron Man" imagen={ironMan} textoBtn="Añadir al carrito" />
            <MiCard titulo="SpiderMan" descripcion="Marvel Movie Collection | Figura de Metal Pesado Spider Man (Avengers: Endgame)" imagen={spiderMan} textoBtn="Añadir al carrito" />
            <MiCard titulo="Hulk" descripcion="Marvel Movie Collection Other Estatua Hulk, Multicolor (EAMOMMFRWS006)" imagen={hulk} textoBtn="Añadir al carrito" />
            <MiCard titulo="Groot" descripcion="Hero Collector Marvel Heavyweight Collection | Capitán América (Avengers: Endgame)" imagen={groot} textoBtn="Añadir al carrito" />
            <MiCard titulo="Capitana Marvel" descripcion="Hero Collector Colección Marvel Pesos Pesados | Figura de Metal Pesado Iron Man" imagen={capitana} textoBtn="Añadir al carrito" />
            <MiCard titulo="Halcon" descripcion="Marvel Movie Collection | Figura de Metal Pesado Spider Man (Avengers: Endgame)" imagen={halcon} textoBtn="Añadir al carrito" />
            <MiCard titulo="Ant-man" descripcion="Marvel Movie Collection Other Estatua Hulk, Multicolor (EAMOMMFRWS006)" imagen={antman} textoBtn="Añadir al carrito" />
        </div>
    )
}

export default Index
