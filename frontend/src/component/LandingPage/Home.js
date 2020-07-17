import React, {useEffect} from 'react'
import { Col, Row } from 'antd'
import '../../style/LandingPage/Home.css'

export default function Home() {
    useEffect(() => {
        let loadTime = new Date();
        let storage = localStorage.getItem('unloadTime')
        let unloadTime = new Date(storage)
        let refreshTime = loadTime.getTime() - unloadTime.getTime();
        if(refreshTime > 3000) {
            window.localStorage.removeItem('ACCESS_TOKEN')
            window.localStorage.removeItem('PeopleSub')
            window.localStorage.removeItem('unloadTime')
        }
    }, [])
    return (
        <div>
            <Row className="home">
                <Col className="miniHome">
                    <img src="https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                    <div>
                        <div>
                            <div className="content">
                                <h1>READY TO WORK SMARTER?</h1>
                                <p>WITH FASTER &amp; EASIER TOOL</p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
