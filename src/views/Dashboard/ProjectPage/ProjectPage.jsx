import React from 'react'
import styled from 'styled-components'
import Statistics from './Statistics';
import Members from './Members/Members';
import Locality from './Locality/Locality';
import { Col, Row } from 'antd';
import Taxa from './Taxa/Taxa';

const Container = styled.section`
    width: 100%;
    margin: 50px 0px;
    box-sizing: border-box;
`;


function ProjectPage() {
    return (
        <Container>
            <Row>
                <Statistics />
            </Row>
            <Row gutter={64}>
                <Col xs={12}>
                    <Members />
                </Col>
                <Col xs={12}>
                    <Locality />
                </Col>
            </Row>
            <Row>
                <Taxa />
            </Row>
        </Container>
    )
}

export default ProjectPage