import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import ProductDetsils from './components/ProductDetsils'
export default function App() {
  return (
    <div className=''>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-login' element={<Login/>} />
        <Route path='/product-details/:productId' element={<ProductDetsils/>} />
      </Routes>
    </div>
  )
}
