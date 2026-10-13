import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Courses = () => {
  return (
    <div>
        <h2>Select your course:</h2>
        <nav className='m-2'>
            <NavLink to="youtube" className="m-2">YouTube</NavLink>
            <NavLink to="certificate" className="m-2">Certificate</NavLink>
        </nav>
        <Outlet/>
    </div>
  )
}

export default Courses