import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchUsers } from "../../../../../redux/redux-modules/user/actions";
import TitleAddSection from "../../Common/TitleAddSection";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    
`;



function Members({ data, loading, meta, fetchUsers, projectId }) {
    const [filters, setFilters] = useState({ project: projectId });
    const [visible, setVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        fetchUsers(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        fetchUsers(pagination.current, filters);
    }

    return (
        <Container>
            <TitleAddSection
                title="Member(s)"
                handleClick={() => setVisible(true)}
            />
            <ContentContainer>

                <FormContainer visible={visible} setVisible={setVisible} projectId={projectId} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (page, filters) => dispatch(fetchUsers(page, filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        data: state.user.data,
        meta: state.user.meta
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);