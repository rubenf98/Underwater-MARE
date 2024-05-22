import React from "react";
import { Menu, Dropdown, Popconfirm } from "antd";
import styled from "styled-components";

const StyledDropdownLink = styled.span`
  color: inherit;
`;
const RowOperation = ({ onDeleteConfirm, children, onUpdateClick }) => {
    const items = [
        {
            key: '1',
            label: onUpdateClick && (
                <a onClick={() => onUpdateClick()} href="#">
                    Update
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <Popconfirm
                    title="Do you want to delete?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onDeleteConfirm()}
                >

                    Delete
                </Popconfirm>
            ),
        }
    ]

    return (
        <Dropdown menu={{ items }}>
            <StyledDropdownLink className="ant-dropdown-link">
                <img src="/assets/icons/dropdown.svg" alt="dropdown" />
            </StyledDropdownLink>
        </Dropdown>
    );
};

export default RowOperation;
