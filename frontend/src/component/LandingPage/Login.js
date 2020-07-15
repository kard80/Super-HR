import React, { useEffect, useState } from 'react'
import '../../style/LandingPage/Login.css'
import { Link, Redirect } from 'react-router-dom'
import axios from '../../config/axios'
import jwtDecode from 'jwt-decode'

export default function Login(props) {
    const { login, setLogin } = props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const loginFnc = async () => {
        const body = {
            username,
            password
        }
        const result = await axios.post('/user/login', body);
        localStorage.setItem('ACCESS_TOKEN', result.data)
        setIsLogin(true)
    }

    const checkRole = () => {
        if (localStorage.getItem('ACCESS_TOKEN')) {
            const token = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))
            if (token.role === 'User') {
                return <Redirect to="/People" />
            } else {
                return <Redirect to="/admin" />
            }
        }
    }

    return (
        <div className="login">
            <div className="block">
                <div className="cross" onClick={() => setLogin(false)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                </div>
                <div className="header"><h1>Super HR</h1></div>
                <div className="loginField">
                    <div>
                        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button className="buttonLogin" onClick={loginFnc}>Log in</button>
                        {checkRole()}
                        <Link to="/register" className="createAccount"><p>Create administrative user</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
