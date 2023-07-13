import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './components/User/User';
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users/:userId" element={<User />} />
          <Route exact path="/auth"
            element={localStorage.getItem("currentUser") != null ? (<Navigate to="/" />) : <Auth />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
