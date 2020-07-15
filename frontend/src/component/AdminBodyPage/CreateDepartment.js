import React, { useState, useEffect } from 'react'
import Navbar from '../BodyPage/NavbarBody'
import Sidebar from '../BodyPage/Sidebar'
import axios from '../../config/axios';
import '../../style/AdminPage/createDepartment.css';

export default function CreateDepartment() {
    const [department, setDepartment] = useState([])
    const [position, setPosition] = useState([])
    const [addDepartment, setAddDepartment] = useState('')
    const [select, setSelect] = useState('department')
    const [isUpdated, setIsUpdated] = useState(false)

    const [departmentId, setDepartmentId] = useState('1')
    const [positionText, setPositionText] = useState('')

    const [person, setPerson] = useState([])
    const [personId, setPersonId] = useState('1')
    const [positionId, setPositionId] = useState('1')

    const fetchDepartmentData = async () => {
        const department = await axios.get('/department')
        setDepartment(department.data)
    }

    const fetchPositionData = async () => {
        const position = await axios.get('/position')
        setPosition(position.data)
    }

    const fetchPersonData = async () => {
        const person = await axios.get('/person')
        setPerson(person.data)
    }

    const sendDepartmentData = async () => {
        const addDepartmentBody = { department: addDepartment }
        await axios.post('/department', addDepartmentBody)
        alert('Update completed')
        setAddDepartment('')
        setIsUpdated(!isUpdated)
        console.log(isUpdated)
    }

    const sendPositionData = async () => {
        const body = {
            position: positionText,
            departmentId
        }
        await axios.post('/position', body)
        alert('update completed')
        setPositionText('')
        setDepartmentId('1')
        setIsUpdated(!isUpdated)
        console.log(isUpdated)
    }

    const syncPersonPosition = async () => {
        const body = {
            id: personId,
            positionId,
        }

        await axios.put('/person/syncPosition', body)
        alert('Updated complete')
        setIsUpdated(!isUpdated)
        console.log(isUpdated)
    }

    useEffect(() => {
        fetchDepartmentData()
        fetchPositionData()
        fetchPersonData()
    }, [isUpdated])

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="createDepartment">
                <div className="select">
                    <div className="field" >
                        <button className={select === 'department'?'selectChoice':"label"} onClick={() => setSelect('department')}>Department</button>
                    </div>
                    <div className="field">
                        <button className={select === 'position'?'selectChoice':"label"} onClick={() => setSelect('position')}>Position</button>
                    </div>
                </div>
                <br />
                {select === 'department' ?
                    <div className="insertDepartment">
                            <label>Insert new department name</label>
                            <input type="text" value={addDepartment} onChange={e => setAddDepartment(e.target.value)} />
                            <button className="sendButton" onClick={sendDepartmentData}>save</button>
                    </div> :
                    <div className="positionStaff">
                        <div className="createPosition">
                            <label>Department</label>
                            <select value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
                                {department.map(item => (
                                    <option value={item.id}>{item.department}</option>
                                ))}
                            </select>
                            <label>Position</label>
                            <input type="text" value={positionText} onChange={e => setPositionText(e.target.value)}/>
                            <button className="sendButton" onClick={sendPositionData}>Save</button>
                        </div>
                        <div className="syncPosition">
                            <label>Position</label>
                            <select value={positionId} onChange={e => setPositionId(e.target.value)}>
                                {position.map(item => (
                                    <option value={item.id}>{item.position}</option>
                                ))}
                            </select>
                            <label>Employee</label>
                            <select value={personId} onChange={e => setPersonId(e.target.value)}>
                                {person.map(item => (
                                    <option value={item.id}>{item.name} {item.surname}</option>
                                ))}
                            </select>
                            <button className="sendButton" onClick={syncPersonPosition}>Save</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
