import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchLocalities } from "../../../../../redux/redux-modules/locality/actions";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    
`;



function Locality({ data, loading, meta, fetchLocalities, projectId }) {
    const [filters, setFilters] = useState({ project: projectId });
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState({})

    useEffect(() => {
        fetchLocalities(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        fetchLocalities(pagination.current, filters);
    }

    return (
        <Container>
            <h2>Site(s) and localities</h2>
            <ContentContainer>

                <FormContainer visible={visible} setVisible={setVisible} currentUser={current} />
                <Row style={{ marginBottom: "20px" }}>
                    <Input.Search onSearch={(e) => setFilters({ search: e })} size="large" type="search" placeholder="Search by locality or site" />
                </Row>
                <TableContainer
                    handlePageChange={handlePageChange}
                    data={data} loading={loading} meta={meta}
                    setVisible={setVisible} setCurrent={setCurrent}
                />
            </ContentContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocalities: (page, filters) => dispatch(fetchLocalities(page, filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.locality.loading,
        data: state.locality.data,
        meta: state.locality.meta
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locality);