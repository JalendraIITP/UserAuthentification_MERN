import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Advertisement from './components/Advertisement/Advertisement'
import LoggedOut from './components/LoggedOut/LoggedOut'
import UseContextProvider from './Context/ContextProvider'
import Footer from './components/Footer/Footer';
const App = () => {
  return (
    <UseContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Advertisement />} />
          <Route path='/user/out' element={<LoggedOut />} />
          <Route path='/user/:user' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </UseContextProvider>
  )
}

export default App
