
import React from 'react'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Login from './Component/Login'
import Register from './Component/Register'
import Home from './Component/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
      
      <Routes>
        <Route path = "/" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/dashboard" element = {<Home/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

