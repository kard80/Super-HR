import React from 'react'
import Navbar from './NavbarBody'
import Sidebar from './Sidebar'
import '../../style/BodyPage/Body.css'
import People from './People'

export default function Body() {
    return (
        <div className="body">
            <Navbar />
            <Sidebar />
            <People />
            {/* <Timestamp /> */}
            {/* <Leaves /> */}
            {/* <PeopleSub /> */}

        </div>
    )
}
