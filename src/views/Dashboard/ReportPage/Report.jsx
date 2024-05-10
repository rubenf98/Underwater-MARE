import { Col, Input, Row } from 'antd'
import React, { useState, useEffect } from 'react'
import ReportMap from './ReportMap'
import TableContainer from './TableContainer';
import { fetchReports } from '../../../../redux/redux-modules/report/actions';
import { connect } from 'react-redux';
import styled from "styled-components";
import Motile from './Motile/Motile';
import Benthic from './Benthic/Benthic';

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin: 100px 0px;
`;


function Report(props) {
    const { data, loading, meta } = props;
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        props.fetchReports(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        props.fetchReports(pagination.current, filters);
    }

    return (
        <Container>


            <h2>Reports</h2>

            <Row style={{ marginBottom: "20px" }}>
                <Input.Search onSearch={(e) => setFilters({ search: e })} size="large" type="search" placeholder="Search by name or email" />
            </Row>
            <Row gutter={64}>
                <Col xs={12}>
                    <TableContainer
                        handlePageChange={handlePageChange}
                        data={data} loading={loading} meta={meta}
                        setVisible={setVisible} setCurrentUser={setCurrentUser}
                    />
                </Col>
                <Col xs={12}>
                    <ReportMap />
                </Col>
            </Row>
            <Row>
                <Motile />
            </Row>

            <Row>
                <Benthic />
            </Row>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReports: (id, data) => dispatch(fetchReports(id, data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.report.loading,
        data: state.report.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);