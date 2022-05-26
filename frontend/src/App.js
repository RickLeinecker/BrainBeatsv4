import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'

import Home from './Pages/Home';
import Login from './Pages/Login'

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
