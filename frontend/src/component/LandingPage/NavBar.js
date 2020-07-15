import React, { useEffect, useState, useRef } from 'react'
import { Col, Row, Button } from 'antd'
import { Link, animateScroll as scroll } from 'react-scroll'
import 'antd/dist/antd.css';
import '../../style/LandingPage/NavBar.css'
import '../../style/LandingPage/Login.css'
import Login from './Login'

export default function NavBar(props) {
    const [login, setLogin] = useState(false)




    return (
        <div id="navBar">
            <Row className="nav">
                <Col>
                    <h1>Super HR</h1>
                </Col>
                <Col className="navList">
                    <ul>
                        <Link activeClass="active"
                            to="home"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>
                            <li>Home</li>
                        </Link>
                        <Link activeClass="active"
                            to="feature"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>
                            <li>Feature</li>
                        </Link>
                        <Link activeClass="active"
                            to="about"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}>
                            <li>Contact me</li>
                        </Link>
                        <li>
                            <button onClick={() => setLogin(true)}>Login</button>
                        </li>
                    </ul>
                </Col>
            </Row>
            {login && <Login login={login} setLogin={setLogin} />}
        </div>
    )
}