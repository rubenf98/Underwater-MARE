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
            title: '',
            dataIndex: 'image',
            render: (image) => <Avatar size="large" icon={<img src={image} alt="profile" />} />
        },

        {
            title: 'Name',
            dataIndex: 'userable',
            render: (userable) => userable.user.name

        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        // {
        //     title: 'Role(s)',
        //     dataIndex: 'roles',
        //     render: (records) => Object.entries(records).map((value) => (
        //         <span key={value[0]}>
        //             {value[1] && <Tag color={colorDecoder[value[0]]}> {value[0]} </Tag>}
        //         </ span>
        //     ))
        // },
        // {
        //     title: '',
        //     dataIndex: 'Operation',
        //     render: (_, record) =>
        //         data.length >= 1 ? (
        //             <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
        //                 <a>Remove</a>
        //             </Popconfirm>
        //         ) : null,
        // },
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
