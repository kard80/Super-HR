import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import '../../style/BodyPage/People.css'
import { Link } from 'react-router-dom'
import NavbarBody from './NavbarBody'
import Sidebar from './Sidebar'
import jwtDecode from 'jwt-decode'
import axios from '../../config/axios'

export default function People() {
    const [person, setPerson] = useState([])

    const token = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))

    const fetchData = async () => {
        if (token.role === 'Admin') {
            let result = await axios.get(`/person`)
            return setPerson(result.data)
        } else {
            let result = await axios.get(`/person/${token.id}`)
            return setPerson([result.data])
        }
    }



    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <NavbarBody />
            <Sidebar />
            <div className="people">
                <Row className="head">
                    <table>
                        <tr>
                            <th>name</th>
                            <th>Job Position</th>
                            <th>Department</th>
                            <th>Status</th>
                        </tr>
                        {person.map(item => (
                            <tr>
                                <td><Link to={{ pathname: "/people/general", id: item.id, }}>{item.name} {item.surname}</Link></td>
                                <td>{
                                    typeof (item.positionId) !== 'object' ?
                                        item.position.position :
                                        ''
                                }</td>
                                <td>{
                                    typeof (item.departmentId) !== 'object' ?
                                        item.department.department :
                                        ''
                                }</td>
                                <td>{item.employeeStatus}</td>
                            </tr>
                        ))}
                    </table>
                </Row>
            </div>
        </div>
    )
}
