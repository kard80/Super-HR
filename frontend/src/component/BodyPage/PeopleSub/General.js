import React, { useState, useEffect } from 'react'
import '../../../style/BodyPage/PeopleSub/General.css'
import PeopleSub from './PeopleSub'
import axios from '../../../config/axios';
import jwtDecode from 'jwt-decode'

export default function General(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [martialStatus, setMartialStatus] = useState('');
    const [nationality, setNationality] = useState('');
    const [IDNumber, setIDNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');

    const [employeeCode, setEmployeeCode] = useState('');
    const [workingStartDate, setWorkingStartDate] = useState('');
    const [probationEndDate, setProbationEndDate] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [employeeStatus, setEmployeeStatus] = useState('');
    const [manager, setManager] = useState('');
    const [resignationDate, setResignationDate] = useState('');
    const [resignationReason, setResignationReason] = useState('');

    const [taxID, setTaxID] = useState('');
    const [accountNO, setAccountNO] = useState('');
    const [accountName, setAccountName] = useState('');
    const [compensationType, setCompensationType] = useState('');
    const [salary, setSalary] = useState('');

    const [pullDepartment, setPullDepartment] = useState([])
    const [pullPosition, setPullPosition] = useState([])
    const token = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))


    const fetchData = async () => {
        const result = await axios.get(`/person/${props.location.id}`)
        const department = await axios.get('/department')
        setName(result.data.name)
        setSurname(result.data.surname)
        setEmail(result.data.email)
        setGender(result.data.gender)
        setDateOfBirth(result.data.dateOfBirth)
        setMartialStatus(result.data.martialStatus)
        setNationality(result.data.nationality)
        setIDNumber(result.data.IDNumber)
        setContactNumber(result.data.contactNumber)
        setAddress(result.data.address)
        setEmployeeCode(result.data.employeeCode)
        setWorkingStartDate(result.data.workingStartDate)
        setProbationEndDate(result.data.probationEndDate)
        setPullDepartment(department.data)
        setEmployeeType(result.data.employeeType)
        setEmployeeStatus(result.data.employeeStatus)
        setResignationDate(result.data.resignationDate)
        setResignationReason(result.data.resignationReason)
        setTaxID(result.data.taxID)
        setAccountNO(result.data.accountNO)
        setAccountName(result.data.accountName)
        setCompensationType(result.data.compensationType)
        setSalary(result.data.salary)
        setDepartment(result.data.departmentId)
        setJobTitle(result.data.positionId)
        
        setPullDepartment(department.data)
        
    }

    const fetchPosition = async () => {
        const position = await axios.get(`/position/${department}`)
        setPullPosition(position.data)
    }

    
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchPosition();
    }, [department])

    const [general, setGeneral] = useState(true)
    const [info, setInfo] = useState(false)
    const [compensation, setCompensation] = useState(false)
    
    const generalClick = () => {
        setGeneral(true)
        setInfo(false)
        setCompensation(false)
    }
    const infoClick = () => {
        setGeneral(false);
        setInfo(true);
        setCompensation(false);
    }
    const compensationClick = () => {
        setGeneral(false);
        setInfo(false);
        setCompensation(true)
    }

    const whoEdit = (user, admin) => {
        if(token.role === 'User') {
            return user? false: true
        }else {
            return admin? false: true
        }
    }



    return (
        <div>
            <PeopleSub
                name={name} surname={surname} jobTitle={jobTitle}
                contactNumber={contactNumber} email={email} gender={gender}
                dateOfBirth={dateOfBirth} martialStatus={martialStatus}
                nationality={nationality} IDNumber={IDNumber} contactNumber={contactNumber}
                address={address}
                
                employeeCode={employeeCode} workingStartDate={workingStartDate} probationEndDate={probationEndDate}
                jobTitle={jobTitle} department={department} employeeType={employeeType} employeeStatus={employeeStatus}
                manager={manager} resignationDate={resignationDate} resignationReason={resignationReason}

                taxID={taxID} accountNO={accountNO} accountName={accountName} compensationType={compensationType}
                salary={salary} id={props.location.id}
            />
            <div className="General">
                <div className="sidebarPersonal">
                    <ul>
                        <li className="personalList" onClick={generalClick}>General</li>
                        <li className="personalList" onClick={infoClick}>Employee info.</li>
                        <li className="personalList" onClick={compensationClick}>Compensation</li>
                    </ul>
                </div>
                {general && (
                    <div className="gridContainer">
                        <div className="gridItem">
                            <div id="item1">
                                <h1>Personal information</h1>
                            </div>
                            <div id="item2">
                                <label>Name</label>
                                <br />
                                <input disabled={whoEdit(true, true)}  value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                            <div id="item3">
                                <label>Surname</label>
                                <br />
                                <input disabled={whoEdit(true, true)} value={surname} onChange={e => setSurname(e.target.value)}></input>
                            </div>
                            <div id="item4">
                                <label>E-mail</label>
                                <br />
                                <input disabled={whoEdit(true, true)} type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                            </div>
                            <div id="item5">
                                <label>Gender</label>
                                <br />
                                <select disabled={whoEdit(false, true)} value={gender} onChange={e => setGender(e.target.value)}>
                                    <option value="">--select--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div id="item6">
                                <label>Date of birth</label>
                                <br />
                                <input disabled={whoEdit(false, true)} type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)}></input>
                            </div>
                            <div id="item7">
                                <label>Martial status</label>
                                <br />
                                <select disabled={whoEdit(true, true)} value={martialStatus} onChange={e => setMartialStatus(e.target.value)}>
                                    <option value=''>--select--</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>divorced</option>
                                    <option>widowed</option>
                                </select>
                            </div>
                            <div id="item8">
                                <label>Nationality</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={nationality} onChange={e => setNationality(e.target.value)}></input>
                            </div>
                            <div id="item9">
                                <label>ID number</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={IDNumber} onChange={e => setIDNumber(e.target.value)}></input>
                            </div>
                            <div id="item10">
                                <label>Contact number</label>
                                <br />
                                <input disabled={whoEdit(true, true)} value={contactNumber} onChange={e => setContactNumber(e.target.value)}></input>
                            </div>
                            <div id="item11">
                                <label>Address</label>
                                <br />
                                <input disabled={whoEdit(true, true)} value={address} onChange={e => setAddress(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                )}
                {info && (
                    <div className="gridContainer">
                        <div className="gridItem">
                            <div id="item1">
                                <h1>Employee information</h1>
                            </div>
                            <div id="item2">
                                <label>Employee code</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={employeeCode} onChange={e => setEmployeeCode(e.target.value)} />
                            </div>
                            <div id="item3">
                                <label>Working start date</label>
                                <br />
                                <input disabled={whoEdit(false, true)} type="date" value={workingStartDate} onChange={e => setWorkingStartDate(e.target.value)}></input>
                            </div>
                            <div id="item4">
                                <label>Probation end date</label>
                                <br />
                                <input disabled={whoEdit(false, true)} type="date" value={probationEndDate} onChange={e => setProbationEndDate(e.target.value)}></input>
                            </div>
                            <div id="item5">
                                <label>Department</label>
                                <br />
                                <select disabled={whoEdit(false, true)} value={department} onChange={e => setDepartment(e.target.value)}>
                                    <option>--select--</option>
                                    {pullDepartment.map(item => (
                                        <option value={item.id}>{item.department}</option>
                                    ))}
                                </select>
                            </div>
                            <div id="item6">
                                <label>Job title</label>
                                <br />
                                <select  disabled={whoEdit(false, true)} value={jobTitle} onChange={e => setJobTitle(e.target.value)}>
                                    <option>--Select--</option>
                                    {pullPosition.map(item => (
                                        <option value={item.id}>{item.position}</option>
                                    ))}
                                </select>
                            </div>
                            <div id="item7">
                                <label>Employee type</label>
                                <br />
                                <select disabled={whoEdit(false, true)} value={employeeType} onChange={e => setEmployeeType(e.target.value)} placeholder="select">
                                    <option>Permanent</option>
                                    <option>Contact</option>
                                    <option>Part-time</option>
                                    <option>Internship</option>
                                </select>
                            </div>
                            <div id="item8">
                                <label>Employee status</label>
                                <br />
                                <select disabled={whoEdit(false, true)} value={employeeStatus} onChange={e => setEmployeeStatus(e.target.value)}>
                                    <option>Confirmed</option>
                                    <option>Probation</option>
                                    <option>Resigned</option>
                                    <option>Dismissed</option>
                                    <option>Contract Ended</option>
                                    <option>Retired</option>
                                    <option>Retrenched</option>
                                    <option>Deceased</option>
                                </select>
                            </div>
                            <div id="item9">
                                <label>Manager</label>
                                <br />
                                <input disabled={whoEdit(false, true)} type="text" value={manager} onChange={e => setManager(e.target.value)} />
                            </div>
                            <div id="item10">
                                <label>Resignation date</label>
                                <br />
                                <input disabled={whoEdit(false, true)} type="date" value={resignationDate} onChange={e => setResignationDate(e.target.value)}></input>
                            </div>
                            <div id="item11">
                                <label>Resignation reason</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={resignationReason} onChange={e => setResignationReason(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}
                {compensation && (
                    <div className="gridContainer">
                        <div className="gridItem">
                            <div id="item1">
                                <h1>Compensation</h1>
                            </div>
                            <div id="item2">
                                <label>Tax ID</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={taxID} onChange={e => setTaxID(e.target.value)} />
                            </div>
                            <div id="item3">
                                <label>Account No.</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={accountNO} onChange={e => setAccountNO(e.target.value)} />
                            </div>
                            <div id="item4">
                                <label>Account name</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={accountName} onChange={e => setAccountName(e.target.value)} />
                            </div>
                            <div id="item5">
                                <label>Compensation type</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={compensationType} onChange={e => setCompensationType(e.target.value)} />
                            </div>
                            <div id="item6">
                                <label>Salary</label>
                                <br />
                                <input disabled={whoEdit(false, true)} value={salary} onChange={e => setSalary(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
