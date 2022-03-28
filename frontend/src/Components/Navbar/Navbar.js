import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'

const Navbars = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container >
                    <Navbar.Brand href="#home">Logo</Navbar.Brand>
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
                </Container>
            </Navbar>
        </>
    )
}

export default Navbars