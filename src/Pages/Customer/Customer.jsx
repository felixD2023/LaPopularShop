import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const Customer = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>

    </>
  )
}

export default Customer
