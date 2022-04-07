import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'

import Home from './Pages/Home';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Forgot from './Pages/Forgot'

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Forgot' element={<Forgot />} />
        </Routes>
      </Router>
  );
}

export default App;