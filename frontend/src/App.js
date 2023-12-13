import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Navbar from './components/Navbar/Navbar'
import LostItem from './components/LostItem/LostItem'
import FoundItem from './components/FoundItem/FoundItem'
import AddItems from './components/AddItems/AddItems'
import Welcome from './components/Welcome/Welcome'
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/lostItem' element={<LostItem />} />
        <Route path='/foundItem' element={<FoundItem />} />
        <Route path='/addItems' element={<AddItems />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
