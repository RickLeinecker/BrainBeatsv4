import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router, Navigate} from 'react-router-dom'

import Home from './Pages/Home';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Forgot from './Pages/Forgot'
import Profile from './Pages/Profile';
import Test from './Pages/Test';

import Record from './Pages/Recording';
import { useContext } from 'react';
import { AuthContext } from './Components/context/AuthContext';


function App() {

  const {user} = useContext(AuthContext);

  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Login' element={user ? <Navigate to ='/' /> : <Login />}/>
          <Route path='/Record' element={user? <Record /> : <Navigate to='/Login' />} />
          <Route path='/Profile' element={user ? <Profile /> : <Navigate to='/Login' />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Forgot' element={<Forgot />} />
          
          <Route path='/Test' element={<Test />} />
        </Routes>
      </Router>
  );
}

export default App;