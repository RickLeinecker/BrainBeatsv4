import {React} from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap'
import Logo from './Logo.jpg'
import { FaHome, FaUserEdit, FaRegPlayCircle, FaDoorOpen, FaSearch, FaMusic, FaRegArrowAltCircleRight
,FaBars } from 'react-icons/fa';
import './Nav.css'
import { useRecoilState } from 'recoil';
import {userModeState} from '../context/GlobalState'

let imgStyle = {
    width: '70px',
    height: '70px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%'
}

let navLink = {
    textDecoration: 'none',
}

const Navbars = () => {
    const [user, setUser]  = useRecoilState(userModeState)

    const Logout = () => {
        setUser(null)
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container >
                    <Navbar.Brand>
                        <Link to='/'>
                            <img src={Logo} alt="Logo" className='homeImg' />
                            BrainBeats
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Collapse>
                        <Navbar.Text>
                            <Button> <a href="/Test">Test</a></Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    
                    <Navbar.Collapse className="justify-content-end">
                        {user ?
                            <NavDropdown title={user.username}>
                                <NavDropdown.Item ><Link to='/' style={{ textDecoration: 'none' }}><FaHome /> Home</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Search' style={{ textDecoration: 'none' }}><FaSearch /> Search</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Profile' style={{ textDecoration: 'none' }} ><FaUserEdit /> Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Record' style={{ textDecoration: 'none' }}><FaRegPlayCircle />Record</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Playlist' style={{ textDecoration: 'none' }}><FaMusic />Playlist</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={Logout}><FaDoorOpen />Logout</NavDropdown.Item>
                            </NavDropdown>
                            :
                            <NavDropdown title={<FaBars size={30}/>} style={{paddingLeft:'100px'}}>
                                <NavDropdown.Item ><Link to='/' style={{ textDecoration: 'none' }}><FaHome /> Home</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Login' style={{ textDecoration: 'none' }}><FaRegArrowAltCircleRight /> Login</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Search' style={{ textDecoration: 'none' }}><FaSearch /> Search</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to='/Playlist' style={{ textDecoration: 'none' }} ><FaUserEdit /> Playlist</Link></NavDropdown.Item>
                            </NavDropdown>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navbars