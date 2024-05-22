import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from "./FormContainer";
import { Input, Row } from "antd";
import { fetchLocalities, createLocality, updateLocality, deleteLocality } from "../../../../../redux/redux-modules/locality/actions";

const ContentContainer = styled.div`
    width: 100%;
    margin: auto;
`;

const Container = styled.section`
    width: 100%;
    box-sizing: border-box;
    
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        background-color: #044582ff;
        padding: 7px;
        box-sizing: border-box;
        box-shadow: 0px;
        border: 0px;
        cursor: pointer;
        border-radius: 4px;

        img {
            width: 13px;
        }
    }
`;


function Locality(props) {
    const { data, loading, meta, projectId } = props;

    const [filters, setFilters] = useState({ project: projectId });
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState({})

    useEffect(() => {
        props.fetchLocalities(1, filters);
    }, [filters])

    function handlePageChange(pagination) {
        props.fetchLocalities(pagination.current, filters);
    }

    const handleCancel = () => {
        setCurrent({});
        setVisible(false)
    }

    const handleEdit = (aCurrent) => {
        setCurrent(aCurrent);
        setVisible(true)
    }

    return (
        <Container>
            <Title>
                <h2>Site(s) and localities</h2>
                <button onClick={() => setVisible(true)}><img src="/assets/icons/add.svg" alt="add icon to create a new entry" /></button>
            </Title>

            <ContentContainer>

                <FormContainer
                    visible={visible}
                    handleCancel={handleCancel}
                    current={current}
                    create={props.createLocality}
                    update={props.updateLocality}
                    projectId={projectId}
                />
                <Row style={{ marginBottom: "20px" }}>
                    <Input.Search onSearch={(e) => setFilters({ search: e })} size="large" type="search" placeholder="Search by locality or site" />
                </Row>
                <TableContainer
                    handlePageChange={handlePageChange}
                    data={data} loading={loading} meta={meta}
                    setCurrent={handleEdit}
                    handleDelete={props.deleteLocality}
                />
            </ContentContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocalities: (page, filters) => dispatch(fetchLocalities(page, filters)),
        updateLocality: (id, data) => dispatch(updateLocality(id, data)),
        createLocality: (data) => dispatch(createLocality(data)),
        deleteLocality: (id) => dispatch(deleteLocality(id))

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