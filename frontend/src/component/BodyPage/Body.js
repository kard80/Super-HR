import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Navbar from './NavbarBody'
import Sidebar from './Sidebar'
import '../../style/BodyPage/Body.css'
import People from './People'
import Timestamp from './Timestamp'
import Leaves from './Leaves'
import PeopleSub from './PeopleSub/PeopleSub'

export default function Body() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <People />
            {/* <Timestamp /> */}
            {/* <Leaves /> */}
            {/* <PeopleSub /> */}

        </div>
    )
}
