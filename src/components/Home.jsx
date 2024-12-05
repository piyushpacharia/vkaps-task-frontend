import React from 'react'
import Products from './Products'
import AddProducts from './AddProducts'
import { role, token } from '../../Server'

export default function Home() {

  return (
    <div className='md:p-20 pt-20'>
      {role === "admin" && token ? (<AddProducts />) : ("")}
      <Products />
    </div>
  )
}
