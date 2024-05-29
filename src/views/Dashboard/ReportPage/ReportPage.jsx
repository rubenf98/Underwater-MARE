import { Col, Row } from 'antd'
import React from 'react'
import ReportMap from './ReportMap'
import styled from "styled-components";
import Motile from './Motile/Motile';
import Benthic from './Benthic/Benthic';
import Report from './Report/Report';
import { useParams } from 'react-router-dom';
import TitleAddSection from '../Common/TitleAddSection';

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin: 100px 0px;
`;

function ReportPage() {
    let { id } = useParams();

    return (
        <Container>
            <Row gutter={64}>
                <Col span={24}>
                    <Report projectId={id} />
                </Col>
                <Col span={24}>
                    <ReportMap projectId={id} />
                </Col>
                <Col span={24}>
                    <Motile projectId={id} />
                </Col>
                <Col span={24}>
                    <Benthic projectId={id} />
                </Col>
            </Row>
        </Container>
    )
}

export default ReportPage;