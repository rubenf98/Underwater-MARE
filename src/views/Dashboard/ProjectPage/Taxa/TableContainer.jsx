import React, { useEffect, useState } from "react";
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

function TableContainer({ loading, data, meta, indicators, handlePageChange, setCurrentUser, setVisible }) {
    const [indicatorColumns, setIndicatorColumns] = useState([])
    let columns = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category) => category.name
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Genus',
            dataIndex: 'genus',
        },
        {
            title: 'Species',
            dataIndex: 'species',
        },
        {
            title: 'Phylum',
            dataIndex: 'phylum',
        }
    ];

    const operationColumns = [
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
    ]

    useEffect(() => {
        let newColumns = [];
        if (indicators.length) {
            let newChildren = [];
            indicators.map((indicator) => {

                newChildren.push(
                    {
                        title: indicator.name,
                        dataIndex: 'indicators',
                        render: (indicators) => indicators.map((value) => (
                            value.name == indicator.name ? value.pivot.name : "---"
                        ))
                    }
                )

            })

            newColumns.push(
                {
                    title: 'Indicators(s)',
                    children: newChildren
                }
            )
        }

        setIndicatorColumns(newColumns)
    }, [indicators])

    return (
        <Container>
            <TableComponent
                loading={loading}
                data={data}
                columns={[...columns, ...indicatorColumns, ...operationColumns]}
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
