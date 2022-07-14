import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router, Navigate} from 'react-router-dom'

import Home from './Pages/Home';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Forgot from './Pages/Forgot'
import Profile from './Pages/Profile';
import Search from './Pages/SearchPage'
import Test from './Pages/Test';
import Playlist from './Pages/Playlist'

import Record from './Pages/Recording';
import { useContext } from 'react';
import { AuthContext } from './Components/context/AuthContext';


function App() {

  const {user} = useContext(AuthContext);

  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Login' element={<Login />}/>
          <Route path='/Record' element={ <Record />} />
          <Route path='/Profile' element={user ? <Profile /> : <Navigate to='/Login' />} />
          <Route path='/Search' element={<Search />} />
          <Route path='/Playlist' element={<Playlist />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Forgot' element={<Forgot />} />
          <Route path='/Test' element={<Test />} />
        </Routes>
      </Router>
  );
}

export default App;