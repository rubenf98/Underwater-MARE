import React from "react";
import { Avatar, Popconfirm, Tag } from 'antd';
import styled from "styled-components";
import TableComponent from "../../Common/TableComponent";


const Container = styled.div`
    width: 100%;
    
.editable-row {
    cursor: pointer;
}
    .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
        display: none;
    }
`;

const colorDecoder = {
    "admin": "gold",
    "validator": "cyan",
}

function TableContainer({ loading, data, meta, handlePageChange, setCurrentUser, setVisible }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Locality',
            dataIndex: 'locality',
        },
        {
            title: 'Site(s)',
            dataIndex: 'sites',
            render: (sites) => sites.map((site) => (
                <span key={site.id}>{site.name} </span>
            ))
        },
        {
            title: '',
            dataIndex: 'Operation',
            render: (_, record) =>
                data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <a>Remove</a>
                    </Popconfirm>
                ) : null,
        },
    ];


    return (
        <Container>
            <TableComponent
                loading={loading}
                data={data}
                columns={columns}
                meta={meta}
                handlePageChange={(aPage) => handlePageChange(aPage)}
                onRow={(record) => ({
                    onClick: () => {
                        setCurrentUser(record);
                        setVisible(true);
                    },
                })}
            />
        </Container>
    )
}

export default TableContainer;
