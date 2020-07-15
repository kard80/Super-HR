import React, {useState, useEffect} from 'react'
import '../../style/LandingPage/Register.css'
import {Link, Redirect} from 'react-router-dom'
import axios from '../../config/axios'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameArray, setUsernameArray] = useState([])
    const [passwordArray, setPasswordArray] = useState([])
    const [finished, setFinished] = useState(false)
    // const [isAdmin, setIsAdmin] = useState('')


    const submit = async () => {
        // const role = isAdmin === 'admin'? 'admin': 'user'
        const body = {
            username,
            password,
            role: 'User',
        }
        await axios.post('/user/register', body)

        alert('registry completed')

        setUsername('')
        setPassword('')
        setFinished(!finished)
    }


    return (
        <div className="register">
            <div className="container">
                <div className="crossSign">
                    <Link to="/home">
                    <div id="item1"></div>
                    <div id="item2"></div>
                    <div id="item3"></div>
                    </Link>
                </div>
                <div><h1>Register</h1></div>
                <div>
                    <label>username</label>
                    <br />
                    <input value = {username} onChange = {e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>password</label>
                    <br />
                    <input value = {password} type="password" onChange = {e => setPassword(e.target.value)} />
                </div>
                {/* <div className = "userType">
                    <input type="checkbox" name="userType" value="admin" onChange={e => setIsAdmin(e.target.value)}/>
                    <label for="userType">admin regis</label>
                </div> */}
                <div><button onClick={submit}>Submit</button></div>
                
                {finished && <Redirect to={'/home'} />}
            </div>
        </div>
    )
}
