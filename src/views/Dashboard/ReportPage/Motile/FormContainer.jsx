import React, { useEffect, useState } from "react";
import { Col, Form, Input, InputNumber, Modal, Row } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import RemoteSelectContainer from "../Report/RemoteSelectContainer";
import RemoteCascadeContainer from "../../ProjectPage/Taxa/RemoteCascadeContainer";
import TextArea from "antd/es/input/TextArea";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }
`;

function FormContainer(props) {
  const [form] = Form.useForm();
  const { current, visible, projectId } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current.id) {
        props
          .update(current.id, {
            ...values,
            project_id: projectId,
            taxa_id: values.taxa_id[1],
          })
          .then(() => {
            handleCancel();
          });
      } else {
        props
          .create({
            ...values,
            project_id: projectId,
            taxa_id: values.taxa_id[1],
          })
          .then(() => {
            handleCancel();
          });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  useEffect(() => {
    if (current.id) {
      form.setFieldsValue({
        taxa_id: [current.taxa.category.id, current.taxa.id],
        report_id: current.report.id,
        size_category_id: current?.sizeCategory?.id,
        size: current.size,
        "n0-25": current["n0-25"],
        "n25-50": current["n25-50"],
        ntotal: current.ntotal,
        surveyed_area: current.surveyed_area,
        "density/100": current["density/100"],
        "density/1": current["density/1"],
        "biomass/100": current["biomass/100"],
        "biomass/1": current["biomass/1"],
      });
    }
  }, [visible]);

  return (
    <CustomModal
      width={1280}
      title="Edit motile report"
      open={visible}
      onCancel={handleCancel}
      centered
      onOk={handleOk}
    >
      <Form
        style={{ margin: "30px auto" }}
        layout="vertical"
        requiredMark
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Report" name="report_id" rules={requiredRule}>
              <RemoteSelectContainer />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Taxa" name="taxa_id" rules={requiredRule}>
              <RemoteCascadeContainer projectId={projectId} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Size category" name="size_category_id">
              <RemoteSelectContainer />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Size (cm)" name="size">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item label="n0-25" name="n0-25" rules={requiredRule}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="n25-50" name="n25-50" rules={requiredRule}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="ntotal" name="ntotal" rules={requiredRule}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              label="Survey metadata"
              name="surveyed_area"
              rules={requiredRule}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Density/100"
              name="density/100"
              rules={requiredRule}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Density/1" name="density/1" rules={requiredRule}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="gr/100" name="biomass/100">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="gr/1" name="biomass/1">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Notes" name="note">
              <TextArea style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.motile.loading,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
