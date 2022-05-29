import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'

import Home from './Pages/Home';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Forgot from './Pages/Forgot'
import Profile from './Pages/Profile';

import Record from './Pages/Recording';


function App() {
  return (
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route exact path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Record' element={<Record />} />
=======
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Forgot' element={<Forgot />} />
          <Route path='/Profile' element={<Profile />} />
>>>>>>> dev
        </Routes>
      </Router>
  );
}

export default App;