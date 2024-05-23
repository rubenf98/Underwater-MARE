import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchTaxas } from "../../../../../redux/redux-modules/taxa/actions";
import { fetchIndicatorSelector } from "../../../../../redux/redux-modules/indicator/actions";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    
`;



function Taxa({ data, loading, meta, indicators, fetchTaxas, fetchIndicatorSelector, projectId }) {
    const [filters, setFilters] = useState({ project: projectId });
    const [visible, setVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        fetchTaxas(1, filters);
    }, [filters])

    useEffect(() => {
        fetchIndicatorSelector()
    }, [])


    function handlePageChange(pagination) {
        fetchTaxas(pagination.current, filters);
    }

    return (
        <Container>
            <h2>Project taxa</h2>
            <ContentContainer>

                <FormContainer visible={visible} setVisible={setVisible} currentUser={currentUser} />
                <Row style={{ marginBottom: "20px" }}>
                    <Input.Search onSearch={(e) => setFilters({ search: e })} size="large" type="search" placeholder="Search by name or email" />
                </Row>
                <TableContainer
                    handlePageChange={handlePageChange}
                    data={data} loading={loading} meta={meta} indicators={indicators}
                    setVisible={setVisible} setCurrentUser={setCurrentUser}
                />
            </ContentContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTaxas: (page, filters) => dispatch(fetchTaxas(page, filters)),
        fetchIndicatorSelector: (filters) => dispatch(fetchIndicatorSelector(filters))
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.taxa.loading,
        data: state.taxa.data,
        meta: state.taxa.meta,
        indicators: state.indicator.selector,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Taxa);