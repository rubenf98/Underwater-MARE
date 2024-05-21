import React from "react";
import { Menu, Dropdown, Popconfirm } from "antd";
import styled from "styled-components";

const StyledDropdownLink = styled.a`
  color: inherit;
`;
const RowOperation = ({ onDeleteConfirm, children, onUpdateClick }) => {
    const menu = (
        <Menu>
            {onUpdateClick && (
                <Menu.Item onClick={() => onUpdateClick()}>
                    <a href="javascript:;">
                        Update
                    </a>
                </Menu.Item>
            )}
            {onDeleteConfirm && (
                <Menu.Item>
                    <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDeleteConfirm()}
                    >
                        <a href="javascript:;">
                            Delete
                        </a>
                    </Popconfirm>
                </Menu.Item>
            )}
            {children}
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <StyledDropdownLink className="ant-dropdown-link" href="javascript:;">
                <img src="/assets/icons/dropdown.svg" alt="dropdown" />
            </StyledDropdownLink>
        </Dropdown>
    );
};

export default RowOperation;
