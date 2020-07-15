import React from 'react'
import { Col, Row } from 'antd'
import '../../style/LandingPage/Feature.css'

export default function Feature() {
    return (
        <div className="feature">
            <div className="subFeature">
                <Row justify="center" align="middle" className="headFeature">
                    <Col>
                        <h1> FEATURE</h1>
                    </Col>
                </Row>
                <Row className="cardContainer" justify="space-between" align="middle">
                    <div className="flip-card">
                        <Col className="cardList">
                            <div className="flip-card-front">
                                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-person-512.png" />
                                <p>Person</p>
                            </div>
                            <div className="flip-card-back">
                                <ul>
                                    <li>Collect employee's data</li>
                                    <li>Convenience editing</li>
                                </ul>
                            </div>
                        </Col>
                    </div>
                    <div className="flip-card">
                        <Col className="cardList">
                            <div className="flip-card-front">
                                <img src="https://cdn0.iconfinder.com/data/icons/summer-122/512/summer_holiday_bag_drink_camera-25-512.png" />
                                <p>Holiday</p>
                            </div>
                            <div className="flip-card-back">
                                <ul>
                                    <li>Summary of Leave</li>
                                    <li>Leave form within website</li>
                                </ul>
                            </div>
                        </Col>
                    </div>
                    <div className="flip-card">
                        <Col className="cardList">
                            <div className="flip-card-front">
                                <img src="https://cdn1.iconfinder.com/data/icons/material-device/20/access-time-512.png" />
                                <p>Time stamp</p>
                            </div>
                            <div className="flip-card-back">
                                <ul>
                                    <li>Summative view feature</li>
                                    <li>Clock-In with yourself</li>
                                </ul>
                            </div>
                        </Col>
                    </div>
                </Row>
            </div>
        </div>
    )
}
