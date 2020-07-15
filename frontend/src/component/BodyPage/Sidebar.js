import React from 'react'
import { Col, Row } from 'antd'
import { Link, Route } from 'react-router-dom'
import '../../style/BodyPage/Sidebar.css'
import jwtDecode from 'jwt-decode'

export default function Sidebar() {
    const token = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))
    return (
        <div className="sidebar">
            <Row>
                <Col>
                    {token.role === 'User' ?
                        <ul>
                            <Link to="/People" className="sidebarMain"><li>People</li></Link>
                            <Link to="/Timestamp" className="sidebarMain"><li>Timestamp</li></Link>
                            <Link to="/Leaves" className="sidebarMain"><li>Leaves</li></Link>
                        </ul> :
                        <ul>
                            <Link to="/People" className="sidebarMain"><li>People</li></Link>
                            <Link to="/admin/Timestamp" className="sidebarMain"><li>Timestamp</li></Link>
                            <Link to="/admin/Leaves" className="sidebarMain"><li>Leaves</li></Link>
                            <Link to="/admin/department" className="sidebarMain"><li>Department</li></Link>
                        </ul>
                    }

                </Col>
            </Row>
        </div >
    )
}
