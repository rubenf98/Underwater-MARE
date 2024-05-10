import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    
`;



function Locality({ data, loading, meta, fetchUsers }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        // fetchUsers(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        fetchUsers(pagination.current, filters);
    }

    return (
        <Container>
            <h2>Site(s) and localities</h2>
            <ContentContainer>

                <FormContainer visible={visible} setVisible={setVisible} currentUser={currentUser} />
                <Row style={{ marginBottom: "20px" }}>
                    <Input.Search onSearch={(e) => setFilters({ search: e })} size="large" type="search" placeholder="Search by name or email" />
                </Row>
                <TableContainer
                    handlePageChange={handlePageChange}
                    data={data} loading={loading} meta={meta}
                    setVisible={setVisible} setCurrentUser={setCurrentUser}
                />
            </ContentContainer>
        </Container>
    )
}


export default Locality;