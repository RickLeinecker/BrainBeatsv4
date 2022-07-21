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
        window.location.href='/'
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
                                <NavDropdown.Item href="/"><FaHome /> Home</NavDropdown.Item>
                                <NavDropdown.Item href="/Search"><FaSearch /> Search</NavDropdown.Item>
                                <NavDropdown.Item href="/Profile"><FaUserEdit /> Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/Record"><FaRegPlayCircle />Record</NavDropdown.Item>
                                <NavDropdown.Item href="/Playlist"><FaMusic />Playlist</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={Logout}><FaDoorOpen />Logout</NavDropdown.Item>
                            </NavDropdown>
                            :
                            <NavDropdown title={<FaBars size={30}/>} style={{paddingLeft:'100px'}}>
                                <NavDropdown.Item href="/"><FaHome /> Home</NavDropdown.Item>
                                <NavDropdown.Item href="/Login"><FaRegArrowAltCircleRight /> Login</NavDropdown.Item>
                                <NavDropdown.Item href="/Search"><FaSearch /> Search</NavDropdown.Item>
                                <NavDropdown.Item href="/Playlist"><FaUserEdit /> Playlist</NavDropdown.Item>
                            </NavDropdown>}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navbars