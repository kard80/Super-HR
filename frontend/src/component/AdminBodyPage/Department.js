import React, { useState, useEffect } from 'react'
import Navbar from '../BodyPage/NavbarBody'
import Sidebar from '../BodyPage/Sidebar'
import { Link } from 'react-router-dom'
import '../../style/AdminPage/Department.css'
import axios from '../../config/axios'

export default function Department() {
    const [position, setPosition] = useState([])
    const [positionClearDuplicate, setPositionClearDuplicate] = useState([])
    const [select, setSelect] = useState('select')

    const fetchData = async () => {
        const position = await axios.get('/position')
        setPosition(position.data)
    }
    
    const clearDuplicateWord = () => {
        const check = []
        for(let i=0; i< position.length; i++) {
            const department = position[i].department.department
            check.push(department)
        }
        const final = [...new Set(check)]
        setPositionClearDuplicate(final)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        clearDuplicateWord()
    }, [position])

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="department">
                <div className="headTable">
                    <select value={select} onChange={e => setSelect(e.target.value)}>
                        <option value="select">--Select--</option>
                        {positionClearDuplicate.map(item => (
                        <option value={item}>{item}</option>
                        ))}
                    </select>
                    <Link to="/admin/CreateDepartment"><button>Create</button></Link>
                </div>
                <div className="head">
                    <table>
                        <tr>
                            <th>Department</th>
                            <th>Job Position</th>
                            <th>Employee</th>
                        </tr>
                        {position.map(item => (
                            select === 'select' ?
                                <tr>
                                    <td>{item.department.department}</td>
                                    <td>{item.position}</td>
                                    <td>{item.people.length}</td>
                                </tr> :
                                select === item.department.department ?
                                    <tr>
                                        <td>{item.department.department}</td>
                                        <td>{item.position}</td>
                                        <td>{item.people.length}</td>
                                    </tr> :
                                    null
                        ))}
                    </table>
                </div>
            </div>
            {/* {department? xxx: xxx} */}
            {/* {position? xxx: xxx} */}
            {/* {create ? alert('yes') : alert('no')} */}
        </div>
    )
}
