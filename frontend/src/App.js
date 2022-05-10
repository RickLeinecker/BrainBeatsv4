import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'

import Home from './Pages/Home';
import Login from './Pages/Login'

import Record from './Pages/Recording';


function App() {
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Record' element={<Record />} />
        </Routes>
      </Router>
  );
}

export default App;
