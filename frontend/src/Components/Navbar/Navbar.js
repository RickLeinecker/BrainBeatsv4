import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import Logo from './Logo.jpg'

let imgStyle = {
    width: '70px',
    height: '70px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%'
}

const Navbars = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container >
                    <Navbar.Brand href="/">
                        <img src={Logo} alt="Logo" style={imgStyle}/>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Navbar.Text>
                            <h1>BrainBeats</h1>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button> <a href='/Login'>Login</a></Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button> <a href="/Test">Test</a></Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navbars