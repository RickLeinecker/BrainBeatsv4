import React from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import { CardList } from './CardList'
import { FaHeart } from 'react-icons/fa'

var cardStyle = {
    display: 'block',
    width: '250px',
    transitionDuration: '0.3s',
    height: '300px'
}

const Cards = () => {
    return (
        <>
        <Container style={{overflowX:'auto', overflowY: 'hidden'}}>
                <div style={{display: 'inline-flex'}}>
                    {CardList.map((item, index) => {
                        return (
                            <Card style={{ display: 'block', width: '250px', height: '300px', borderRadius: '15px'}}>
                                <Card.Img variant="top" src='https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png' />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle>{item.artist}</Card.Subtitle>
                                    <Button variant="primary"><FaHeart /></Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
        </Container>
        </>
    )
}

export default Cards