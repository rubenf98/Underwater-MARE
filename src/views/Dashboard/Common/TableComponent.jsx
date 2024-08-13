import { Spin } from "antd";
import Table from "antd/es/table";
import styled from "styled-components";

const Container = styled.div`
  background: transparent;
  border-radius: 5px;

  .ant-table-thead > tr > th {
    background-color: #eaeaea;
    font-weight: bold;
  }

  .ant-table-cell {
    padding: 15px 20px !important;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }

  .table-row {
    &:hover {
      cursor: pointer;
    }
  }

  .ant-table-wrapper {
    background-color: white;
  }

  .ant-pagination {
    padding: 0px 20px;
    box-sizing: border-box;
  }

  .ant-pagination-total-text {
    margin-right: auto;
  }

  tr.border-top > td {
    border-top: 1px solid #757575;
  }
`;

function TableComponent({
  onRow,
  columns,
  data,
  meta,
  handlePageChange,
  loading,
  showQuickJumper = false,
  rowKey = "id",
  handleExpandable,
  bordered = false,
  title,
  handleShowSizeChange,
  scroll,
  rowSelection,
  editable,
}) {
  if (loading && !data)
    return <Spin style={{ width: "100%" }} tip="Loading data" />;

  return (
    <Container>
      <Table
        // scroll={{ x: "100%" }}
        rowClassName={(row, i) => {
          let className = "";

          if (editable) {
            className += "editable-row";
          }
          if (i > 0 && row.children) {
            className += " border-top";
          }
          return className;
        }}
        bordered={bordered}
        onRow={onRow}
        indentSize={0}
        onChange={handlePageChange}
        pagination={
          meta
            ? {
                showQuickJumper: showQuickJumper,
                showSizeChanger: true,
                onShowSizeChange: handleShowSizeChange,
                total: meta.total,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} records`,
                current: meta.current_page,
                pageSize: meta.per_page,
              }
            : false
        }
        columns={columns}
        loading={loading}
        dataSource={data}
        size="small"
        rowKey={(record) => {
          if (typeof rowKey === "string") {
            return record[rowKey];
          } else {
            return rowKey.map((el) => record[el]).join(",");
          }
        }}
        expandable={handleExpandable}
        scroll={scroll}
        rowSelection={rowSelection}
      />
    </Container>
  );
}

export default TableComponent;
