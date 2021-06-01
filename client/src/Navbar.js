import React from 'react'
import { Link } from 'react-router-dom'
import Schedule from './Schedule'

function Navbar() {
    return (
        <div className="topnav">
            <Link to='/home'>Home</Link>
            <Link to='/schedule'>Schedule</Link>
        </div>
    )
}

export default Navbar
