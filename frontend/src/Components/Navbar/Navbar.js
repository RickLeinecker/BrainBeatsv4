import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import Logo from './Logo.jpg'


let imgStyle = {
    width: '70px',
    height: '70px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%'
}

const Navbars = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container >
                    <Navbar.Brand>
                        <Link to='/'>
                            <img src={Logo} alt="Logo" style={imgStyle} />
                        </Link> 
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Navbar.Text>
                            <h1>BrainBeats</h1>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    
                    <Navbar.Collapse>
                        <Navbar.Text>
                            <Button> <a href="/Test">Test</a></Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {user ?
                            <NavDropdown title={user.username}>
                                <NavDropdown.Item ><Link to='/'>Home</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Profile'>Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Record'>Record</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href='/'>Logout</NavDropdown.Item>
                            </NavDropdown> 
                            : 
                            <Navbar.Text>
                                <Button> <a href='/Login'>Login</a></Button>
                            </Navbar.Text>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navbars