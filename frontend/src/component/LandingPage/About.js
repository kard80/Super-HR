import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import '../../style/LandingPage/About.css'

export default function About() {
    return (
        <div className="about">
            <div>
                <Row justify="center">
                    <Col>
                        <h1>CONTACT US</h1>
                    </Col>
                </Row>
                <Row justify = "center" className = "list">
                    <ul>
                        <li><a href = "https://www.facebook.com/kardkang/" target="_blank"><i class="fab fa-facebook"></i> Facebook</a></li>
                        <li><a href = "http://line.me/ti/p/GiW1x4eEoY#~" target="_blank"><i class="fab fa-line"></i> Line</a></li>
                        <li><a href = "https://github.com/kard80" target="_blank"><i class="fab fa-github"></i> Github</a></li>
                        <li><a href="tel:0614121998"><i class="fa fa-phone-square" aria-hidden="true"></i> Tel</a></li>
                    </ul>
                </Row>
            </div>
        </div>
    )
}
