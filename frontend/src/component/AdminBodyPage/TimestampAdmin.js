import React, { useState, useEffect } from 'react'
import '../../style/BodyPage/Timestamp.css'
import Navbar from '../BodyPage/NavbarBody'
import Sidebar from '../BodyPage/Sidebar'
import axios from '../../config/axios'
import jwtDecode from 'jwt-decode'

export default function TimestampAdmin() {
    const [timeAttendance, setTimeAttendance] = useState([]);
    const [dropdown, setDropdown] = useState([])
    const [dropdownValue, setDropdownValue] = useState('')

    const fetchData = async () => {
        const result = await axios.get(`/timeAttendance`);
        setTimeAttendance(result.data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        setDropdownValue(dropdown[0])
    }, [dropdown])


    const dropdownInsert = () => {
        let arr = []
        for (let i = 0; i < timeAttendance.length; i++) {
            let year = timeAttendance[i].createdAt.substring(0, 4)
            let month = timeAttendance[i].createdAt.substring(5, 7)
            arr = [...arr, `${year}-${month}`]
        }
        let sendArr = [...new Set(arr)]
        setDropdown(sendArr.sort().reverse())
    }
    useEffect(() => {
        dropdownInsert()
    }, [timeAttendance])

    const requestData = () => {
        let arr = [];
        for (let i = 0; i < timeAttendance.length; i++) {
            if (timeAttendance[i].createdAt.substring(0, 7) === dropdownValue) {
                arr = [...arr, (
                    <tr>
                        <td>{timeAttendance[i].person.name} {timeAttendance[i].person.surname}</td>
                        <td>{timeAttendance[i].date}</td>
                        <td>{timeAttendance[i].clockIn}</td>
                        <td>{timeAttendance[i].clockOut}</td>
                        <td>{timeAttendance[i].workingTime}</td>
                        <td>{timeAttendance[i].remark}</td>
                    </tr>
                )]
            }
        }
        return arr
    }


    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="timestamp">
                <div className="head">
                    <select value={dropdownValue} onChange={e => setDropdownValue(e.target.value)}>
                        {dropdown.map(item => (
                            item === dropdown.sort().reverse()[0] ?
                                <option selected>{item}</option> :
                                <option>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="table">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Clock-in</th>
                            <th>Clock-out</th>
                            <th>Working Time</th>
                            <th>Remark</th>
                        </tr>
                        {requestData()}
                    </table>
                </div>
            </div>
        </div>
    )
}
