import React, {useEffect} from 'react'
import { Col, Row } from 'antd'
import '../../style/LandingPage/Home.css'

export default function Home() {
    useEffect(() => {
        let loadTime = new Date();
        let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime))
        let refreshTime = loadTime.getTime() - unloadTime.getTime();
        if(refreshTime > 3000) {
            window.localStorage.removeItem('ACCESS_TOKEN')
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
                                {/* <h1>สัมผัสประสบการณ์ใหม่ของ Hr</h1>
                                <p>การทำงานแบบ HR ยุคใหม่ ด้วยการใช้เทคโนโลยีควบคู่กับการดูแลบุคคล ใช้งานง่าย สะดวก พร้อมฟังก์ชันต่างๆ</p>
                                <ul>
                                    <li>เพิ่มข้อมูลพนักงาน เก็บข้อมูล และแก้ไข</li>
                                    <li>ลงทะเบียนเข้างาน - ออกงาน ด้วยตนเอง</li>
                                    <li>พนักงานส่งฟอร์มลาผ่านเว็บไซต์</li>
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
