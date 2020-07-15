import React, { useState, useEffect } from 'react'
import '../../style/BodyPage/Leaves.css'
import NavbarBody from './NavbarBody'
import Sidebar from './Sidebar'
import axios from '../../config/axios'
import jwtDecode from 'jwt-decode'

export default function Leaves() {
    const [type, setType] = useState('Annual Leave')
    const [startDate, setStartDate] = useState('')
    const [timeStartDate, setTimeStartDate] = useState('')
    const [timeEndDate, setTimeEndDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reason, setReason] = useState('')

    const [leave, setLeave] = useState([])

    const [annualLeave, setAnnualLeave] = useState(10)
    const [leaveWithoutPay, setLeaveWithoutPay] = useState(0)
    const [maternityLeave, setMaternityLeave] = useState(90)
    const [personalLeave, setPersonalLeave] = useState(0)
    const [sickLeave, setSickLeave] = useState(30)

    const [dropdown, setDropdown] = useState([])
    const [dropdownValue, setDropdownValue] = useState('')
    const token = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))

    const leaveCountFnc = () => {
        let sumWithoutPay = 0
        let sumMaternity = 90
        let sumPersonal = 0
        let sumSick = 30
        let sumAnnual = 10

        for (let i = 0; i < leave.length; i++) {
            if (leave[i].type === 'Leave without pay') {
                sumWithoutPay += Number(leave[i].totalDate)
            } else if (leave[i].type === 'Maternity Leave') {
                sumMaternity -= Number(leave[i].totalDate)
            } else if (leave[i].type === 'Personal Leave') {
                sumPersonal += Number(leave[i].totalDate)
            } else if (leave[i].type === 'Sick') {
                sumSick -= Number(leave[i].totalDate)
            } else if (leave[i].type === 'Annual Leave') {
                sumAnnual -= Number(leave[i].totalDate)
            }
        }
        setLeaveWithoutPay(sumWithoutPay)
        setMaternityLeave(sumMaternity)
        setPersonalLeave(sumPersonal)
        setSickLeave(sumSick)
        setAnnualLeave(sumAnnual)
    }

    const requestData = () => {
        let arr = []
        for (let i = 0; i < leave.length; i++) {
            if (leave[i].startDate.substring(0, 7) === dropdownValue) {
                arr =  [...arr, (
                    <tr>
                        <td>{leave[i].type}</td>
                        <td>
                            {leave[i].startDate}
                            {leave[i].timeStartDate}
                        </td>
                        <td>
                            {leave[i].endDate}
                            {leave[i].timeEndDate}
                        </td>
                        <td>{leave[i].totalDate}</td>
                        <td>{leave[i].reason}</td>
                    </tr>
                )]
            }
        }
        return arr
    }

    const dropdownInsert = () => {
        let arr = [];
        for (let i = 0; i < leave.length; i++) {
            let year = leave[i].startDate.substring(0, 4);
            let month = leave[i].startDate.substring(5, 7);
            arr = [...arr, `${year}-${month}`]
        }
        let sendArr = [...new Set(arr)]
        setDropdown(sendArr)
    }

    const sendData = async () => {
        const body = {
            type,
            startDate,
            endDate,
            timeStartDate,
            timeEndDate,
            reason,
            personId: token.id,
        }
        let makeSure = window.confirm('Are you sure to send this?')
        if (makeSure) await axios.post('/leave', body)

        setType('')
        setStartDate('')
        setTimeStartDate('')
        setTimeEndDate('')
        setEndDate('')
        setReason('')

        fetchData()
    }

    const fetchData = async () => {
        const result = await axios.get(`/leave/${token.id}`);
        setLeave(result.data)
        console.log(result.data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        leaveCountFnc();
        dropdownInsert();
    }, [leave])

    return (
        <div>
            <NavbarBody />
            <Sidebar />
            <div className="leaves">
                <div className="summaryAndHistory">
                    <div className="summary">
                        <div>
                            <table>
                                <tr>
                                    <th>Summary</th>
                                </tr>
                                <tr>
                                    <td>Annual leaves</td>
                                    <td>{annualLeave}/10</td>
                                </tr>
                                <tr>
                                    <td>Sick leaves</td>
                                    <td>{sickLeave}/30</td>
                                </tr>
                                <tr>
                                    <td>Leaves without pay</td>
                                    <td>{leaveWithoutPay}</td>
                                </tr>
                                <tr>
                                    <td>Person leaves</td>
                                    <td>{personalLeave}</td>
                                </tr>
                                <tr>
                                    <td>Parental leaves</td>
                                    <td>{maternityLeave}/90</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="history">
                        <div>
                            <h1>Request History</h1>
                            <select onChange={e => setDropdownValue(e.target.value)} value={dropdownValue}>
                                <option>--Select--</option>
                                {dropdown.sort().reverse().map(item => <option value={item} >{item}</option>)}
                            </select>
                            <table>
                                <tr>
                                    <th>Leave type</th>
                                    <th>Start date</th>
                                    <th>End date</th>
                                    <th>Total date</th>
                                    <th>reason</th>
                                </tr>
                                {requestData()}
                            </table>
                        </div>
                    </div>
                </div>
                <div className="request">
                    <div>
                        <h1>Leave Request</h1>
                        <div>
                            <label>Leave type*</label>
                            <br />
                            <select value={type} onChange={e => setType(e.target.value)}>
                                <option value="Annual Leave">Annual Leave</option>
                                <option value="Leave without pay">Leave without pay</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                                <option value="Personal Leave">Personal Leave</option>
                                <option value="Sick">Sick</option>
                            </select>
                        </div>
                        <div>
                            <label>Start date*</label>
                            <br />
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                            <br />
                            <input type="radio" id="radioStartDay" name="startDate" value="All day" onChange={e => setTimeStartDate(e.target.value)} required></input>
                            <label for="radioStartDay">All day</label>
                            <input type="radio" id="radioStartAm" name="startDate" value="AM" onChange={e => setTimeStartDate(e.target.value)}></input>
                            <label for="radioStartAm">AM</label>
                            <input type="radio" id="radioStartPm" name="startDate" value="PM" onChange={e => setTimeStartDate(e.target.value)}></input>
                            <label for="radioStartPm">PM</label>
                        </div>
                        <div>
                            <label>End date*</label>
                            <br />
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                            <br />
                            <input type="radio" id="radioEndDay" name="endDate" value="All day" onChange={e => setTimeEndDate(e.target.value)} required></input>
                            <label for="radioEndDay">All day</label>
                            <input type="radio" id="radioEndAm" name="endDate" value="AM" onChange={e => setTimeEndDate(e.target.value)}></input>
                            <label for="radioEndAm">AM</label>
                            <input type="radio" id="radioEndPm" name="endDate" value="PM" onChange={e => setTimeEndDate(e.target.value)}></input>
                            <label for="radioEndPm">PM</label>
                        </div>
                        <div>
                            <label>Reason</label>
                            <br />
                            <textarea value={reason} onChange={e => setReason(e.target.value)}></textarea>
                        </div>
                        <div>
                            <input type="submit" onClick={sendData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
