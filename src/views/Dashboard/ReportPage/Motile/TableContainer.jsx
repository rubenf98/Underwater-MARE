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

function TableContainer({ loading, data, meta, handlePageChange, setCurrent, handleDelete }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            fixed: 'left',
            width: 80,
        },
        {
            title: 'Sample',
            dataIndex: 'report',
            width: 250,
            fixed: 'left',
            render: (report) => report.code
        },
        {
            title: 'Taxa category',
            dataIndex: 'taxa',
            width: 200,
            render: (taxa) => taxa.category.name
        },
        {
            title: 'Genus',
            dataIndex: 'taxa',
            width: 200,
            render: (taxa) => taxa.genus

        },
        {
            title: 'Species',
            dataIndex: 'taxa',
            width: 200,
            render: (taxa) => taxa.species
        },
        {
            title: 'Taxa',
            dataIndex: 'taxa',
            width: 250,
            render: (taxa) => taxa.name

        },
        {
            title: 'Size category',
            dataIndex: 'sizeCategory',
            width: 150,
            render: (sizeCategory) => sizeCategory?.name

        },
        {
            title: 'Size (cm)',
            dataIndex: 'size',
            width: 150,
        },
        {
            title: 'n0-25',
            dataIndex: 'n0-25',
            width: 150,
        },
        {
            title: 'n25-50',
            dataIndex: 'n25-50',
            width: 150,
        },
        {
            title: 'ntotal',
            dataIndex: 'ntotal',
            width: 150,
        },
        {
            title: 'Survey metadata',
            dataIndex: 'surveyed_area',
            width: 150,
        },
        {
            title: 'Density/100',
            dataIndex: 'density/100',
            width: 150,
        },
        {
            title: 'Density/1',
            dataIndex: 'density/1',
            width: 150,
        },
        {
            title: 'gr/100',
            dataIndex: 'biomass/100',
            width: 150,
        },
        {
            title: 'gr/1',
            dataIndex: 'biomass/1',
            width: 150,
        },
        {
            title: 'Notes',
            dataIndex: 'note',
            width: 250,
        },
        {
            title: '',
            dataIndex: 'Operation',
            fixed: 'right',
            width: 80,
            render: (_, record) =>
                <RowOperation
                    deleteRow
                    updateRow
                    onUpdateClick={() => setCurrent(record)}
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
                scroll={{ x: 1500 }}

            />
        </Container>
    )
}

export default TableContainer;
