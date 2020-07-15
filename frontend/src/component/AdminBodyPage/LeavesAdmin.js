import React, { useState, useEffect } from 'react'
import Navbar from '../BodyPage/NavbarBody'
import Sidebar from '../BodyPage/Sidebar'
import '../../style/AdminPage/leavesAdmin.css';
import axios from '../../config/axios';

export default function LeavesAdmin() {
    const [leave, setLeave] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [dropdownValue, setDropdownValue] = useState('select')

    const dropdownInsert = () => {
        let arr = []
        for (let i = 0; i < leave.length; i++) {
            let year = leave[i].startDate.substring(0, 4)
            let month = leave[i].startDate.substring(5, 7)
            arr = [...arr, `${year}-${month}`]
        }
        let sendArr = [...new Set(arr)]
        setDropdown(sendArr.sort().reverse())
    }

    const fetchData = async () => {
        const leave = await axios.get('/leave')
        setLeave(leave.data)
    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        dropdownInsert();
    }, [leave])

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="leavesAdmin">
                <div className="history">
                    <div>
                        <h1>Leave History</h1>
                        <select value={dropdownValue} onChange={e => setDropdownValue(e.target.value)}>
                            <option value="select">--Select--</option>
                            {dropdown.map(item => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Leave type</th>
                                <th>Start date</th>
                                <th>End date</th>
                                <th>Total date</th>
                                <th>reason</th>
                            </tr>
                            {leave.map(item => (
                                dropdownValue === 'select' ?
                                    <tr>
                                        <td>{item.person.name} {item.person.surname}</td>
                                        <td>{item.type}</td>
                                        <td>{item.startDate}</td>
                                        <td>{item.endDate}</td>
                                        <td>{item.totalDate}</td>
                                        <td>{item.reason || '-'}</td>
                                    </tr> :
                                    dropdownValue === item.startDate.substring(0, 7)?
                                    <tr>
                                        <td>{item.person.name} {item.person.surname}</td>
                                        <td>{item.type}</td>
                                        <td>{item.startDate}</td>
                                        <td>{item.endDate}</td>
                                        <td>{item.totalDate}</td>
                                        <td>{item.reason || '-'}</td>
                                    </tr>:
                                    null
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
