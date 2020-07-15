import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/BodyPage/NavbarBody.css'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'

export default function NavbarBody(props) {
    const [signOut, setSignOut] = useState(false)
    const [person, setPerson] = useState([])
    
    const token = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))

    const fetchData = async () => {
        const result = await axios.get(`/person/${token.id}`)
        setPerson(result.data)
        console.log(result.data)
    }

    const signOutFnc = () => {
        localStorage.removeItem('ACCESS_TOKEN')
    }

    window.onbeforeunload = () => {
        window.localStorage.unloadTime = JSON.stringify(new Date())
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <div className="navBarBody">
            <Row className="container">
                <Col>
                    <h1>Super Hr</h1>
                </Col>
                <Col className="containerSubClass">
                    <p>{person.name} {person.surname}</p>
                    {person.picture?
                    <img src={require(`../../upload/${person.picture}`)}  onClick={() => setSignOut(!signOut)}/>:
                    <img src="https://image.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg" onClick={() => setSignOut(!signOut)} />
                }
                    <Row>
                        {signOut && <Col className="signOut"><Link to="/home"><button onClick={signOutFnc}>Sign out</button></Link></Col>}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
