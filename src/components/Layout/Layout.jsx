import React from 'react'
import {Link, Outlet} from "react-router-dom"
import Nav from '../navbar/Navbar'
export default function Layout() {
  return (
    <>
      <Nav/>
      <Outlet />
    </>
  )
}
