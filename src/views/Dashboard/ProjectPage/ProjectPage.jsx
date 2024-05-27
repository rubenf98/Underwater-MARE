import React from 'react'
import styled from 'styled-components'
import Statistics from './Statistics';
import Members from './Members/Members';
import Locality from './Locality/Locality';
import { Col, Row } from 'antd';
import Taxa from './Taxa/Taxa';
import { useParams } from 'react-router-dom';
import Indicator from './Indicator/Indicator';

const Container = styled.section`
    width: 100%;
    margin: 50px 0px;
    box-sizing: border-box;
`;


function ProjectPage() {
    let { id } = useParams();

    return (
        <Container>
            <Row>
                <Statistics projectId={id} />
            </Row>
            <Row gutter={64}>
                <Col md={24} lg={12}>
                    <Members projectId={id} />
                </Col>
                <Col md={24} lg={12}>
                    <Locality projectId={id} />
                </Col>
            </Row>
            <Row>
                <Taxa projectId={id} />
            </Row>
            <Row>
                <Indicator projectId={id} />
            </Row>
        </Container>
    )
}

export default ProjectPage