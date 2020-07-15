import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import NavbarBody from '../NavbarBody'
import Sidebar from '../Sidebar'
import '../../../style/BodyPage/PeopleSub/PeopleSub.css'
import axios from '../../../config/axios'
import { previewImage } from 'antd/lib/upload/utils'

export default function PeopleSub(props) {
    const [file, setFile] = useState('')
    const [ImagePreviewUrl, setImagePreviewUrl] = useState(null)
    const [person, setPerson] = useState([]);
    const {
        name, surname, email, gender, dateOfBirth, martialStatus, nationality, IDNumber, contactNumber, address,

        employeeCode, workingStartDate, probationEndDate, jobTitle, department, employeeType, employeeStatus, manager,
        resignationDate, resignationReason,

        taxID, accountNO, accountName, compensationType, salary
    } = props


    const getData = async () => {
        const result = await axios.get(`/person/${props.id}`);
        setPerson(result.data)
    }

    useEffect(() => {
        getData();
    }, [])

    const handleUploadImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(file)
            setImagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }


    const sendData = async () => {
        if (typeof (file) === 'string') {
            const body = {
                name, surname, email, gender, dateOfBirth, martialStatus, nationality, IDNumber, contactNumber, address,

                employeeCode, workingStartDate, probationEndDate, jobTitle, department,
                employeeType, employeeStatus, manager, resignationDate, resignationReason,

                taxID, accountNO, accountName, compensationType, salary,
            }
            await axios.put(`/person/${props.id}`, body)
        } else {
            const formData = new FormData();
            formData.append('file', file); formData.append('name', name || '');
            formData.append('surname', surname || ''); formData.append('email', email || '');
            formData.append('gender', gender || '');
            formData.append('dateOfBirth', new Date(dateOfBirth) || '');
            formData.append('martialStatus', martialStatus || '');
            formData.append('nationality', nationality || ''); formData.append('IDNumber', IDNumber || '');
            formData.append('contactNumber', contactNumber || '');
            formData.append('address', address || '');

            formData.append('employeeCode', employeeCode || '');
            formData.append('workingStartDate', new Date(workingStartDate) || '');
            formData.append('probationEndDate', new Date(probationEndDate) || '');
            formData.append('jobTitle', jobTitle || '');
            formData.append('department', department || ''); formData.append('employeeType', employeeType || '');
            formData.append('employeeStatus', employeeStatus || ''); formData.append('manager', manager || '');
            formData.append('resignationDate', new Date(resignationDate) || '');
            formData.append('resignationReason', resignationReason || '');

            formData.append('taxID', taxID || '');
            formData.append('accountNO', accountNO || '');
            formData.append('accountName', accountName || '');
            formData.append('compensationType', compensationType || '');
            formData.append('salary', salary || String(''));

            await axios.put(`/person/withPicture/${props.id}`, formData)
        }
        await getData();
        alert('Update completed')
        setFile('')
    }

    return (
        <div>
            <NavbarBody src={person.picture} />
            <Sidebar />
            <div className="general">
                <div className="backArrow">
                    <Link to="/People">
                        <i class="fas fa-arrow-left"></i>
                        <span>Back</span>
                    </Link>
                </div>
                <div className="profileAndPanel">
                    <div className="profile">
                        <div>
                            <div>
                                <div>
                                    <label for="inputFile">
                                        {person.picture ?
                                            <img src={require(`../../../upload/${person.picture}`)} className="profilePicture"/> :
                                            <img src="https://image.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg" className="profilePicture" />}
                                        <input type="file" onChange={e => handleUploadImage(e)} id="inputFile" style={{ display: 'none' }} />
                                    </label>
                                </div>
                                <div className="name">
                                    <h1>{person.name} {true ? person.surname : ''}</h1>
                                    <p>{person.jobTitle}</p>
                                </div>
                            </div>
                            <p>Tel: {person.contactNumber}</p>
                            <p>{person.email}</p>
                            <button className="button" onClick={sendData}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
