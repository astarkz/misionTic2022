import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'components/miCard/micard.css'

const MiCard = ({titulo, descripcion, imagen, textoBtn}) => {
    return (
        <div>
            <Card style={{ width: '20rem', heigth: '50rem'}}>
                <div className="contenedorImg">
                    <Card.Img className="fotoPequena" variant="top" src={imagen} />
                </div>                
                <Card.Body>
                    <Card.Title className="m-2">{titulo}</Card.Title>
                    <Card.Text className="p-2">
                        {descripcion}
                    </Card.Text>
                    <Button className="m-2" variant="primary">{textoBtn}</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default MiCard
