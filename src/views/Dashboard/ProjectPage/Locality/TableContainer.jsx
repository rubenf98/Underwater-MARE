import React from "react";
import { Avatar, Popconfirm, Tag } from 'antd';
import styled from "styled-components";
import TableComponent from "../../Common/TableComponent";
import RowOperation from "../../Common/RowOperation";


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

function TableContainer({ loading, data, meta, handlePageChange, setVisible }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Locality',
            dataIndex: 'name',
            render: (name, row) => name + " (" + row.code + ")"
        },
        {
            title: 'Site(s)',
            dataIndex: 'sites',
            render: (sites) => sites.map((site) => (
                <span key={site.id}>{site.name} ({site.code}), </span>
            ))
        },
        {
            title: '',
            dataIndex: 'Operation',
            render: (_, record) =>
                <RowOperation
                    deleteRow
                    updateRow
                    onUpdateClick={() => setVisible()}
                    onDeleteConfirm={() => handleDelete(record.id)}
                />
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
            />
        </Container>
    )
}

export default TableContainer;