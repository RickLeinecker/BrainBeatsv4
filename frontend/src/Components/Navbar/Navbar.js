import { React, useState} from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Button, NavDropdown, Form } from 'react-bootstrap'
import Logo from './Logo.jpg'
import {
    FaHome, FaUserEdit, FaRegPlayCircle, FaDoorOpen, FaSearch, FaMusic, FaRegArrowAltCircleRight
    , FaBars,FaRegClone
} from 'react-icons/fa';
import './Nav.css'
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userModeState, userJWT } from '../context/GlobalState'

const Navbars = () => {
    const [user, setUser ] = useRecoilState(userModeState)
    const [jwt, setUserJwt] = useRecoilState(userJWT)

    const [search, setSearch] = useState('');

    const Logout = () => {
        setUser(null);
        setUserJwt(null)
        window.location.href = '/'
    }

    

    return (
        <>
            <Navbar style={{backgroundColor: '#333333'}}>
                <Container >
                    <Navbar.Brand className='d-flex justify-content-start'>
                        <NavDropdown title={<FaBars size={30} />}>
                            <NavDropdown.Item href="/Search"><FaSearch />Search</NavDropdown.Item>
                            <NavDropdown.Item href="/About"><FaSearch /> About Us</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Brand>
                    <Navbar.Brand className='d-flex justify-content-start'>
                        <Link to='/'>
                            <img src={Logo} alt="Logo" className='homeImg' />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        {user ?
                            <>
                                <Button className='buttonStyle' href='/Record'> Record</Button>
                                <NavDropdown title={user.username}>
                                    <NavDropdown.Item href="/"><FaHome /> Home</NavDropdown.Item>
                                    <NavDropdown.Item href="/Profile"><FaUserEdit /> Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/Playlist"><FaRegClone/> Playlist</NavDropdown.Item>
                                    
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={Logout}><FaDoorOpen />Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :
                            <>
                                <Button className='buttonStyle' href='/Register'>Sign Up</Button>
                                <Button className='buttonStyle' href='/Login'>Login In</Button>
                            </>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navbars
