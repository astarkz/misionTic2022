import React from 'react'
import './styles.css'
import MiCard from 'components/miCard/MiCard'
import capitan from 'img/fotos_juguetes/capitan.jpg'
import ironMan from 'img/fotos_juguetes/iron.jpg'
import spiderMan from 'img/fotos_juguetes/spider.jpg'

const Index = () => {
    return (
        <div className="fondoGris">
            <MiCard titulo="Capitán América" descripcion="Hero Collector Marvel Heavyweight Collection | Capitán América (Avengers: Endgame) Figura de metal pesado 8 por Eaglemoss" imagen={capitan} textoBtn="Añadir al carrito" />
            <MiCard titulo="Iron Man" descripcion="Hero Collector Colección Marvel Pesos Pesados | Figura de Metal Pesado Iron Man1 de Eaglemoss" imagen={ironMan} textoBtn="Añadir al carrito" />
            <MiCard titulo="SpiderMan" descripcion="Marvel Movie Collection, Figura Spider Man" imagen={spiderMan} textoBtn="Añadir al carrito" />
        </div>
    )
}

export default Index
