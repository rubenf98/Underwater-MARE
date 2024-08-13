import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { handleArrayToFormData } from "src/helper";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }
  
  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

const requiredRule = { required: true };

function FormContainer(props) {
  const [form] = Form.useForm();
  const { current, visible, projectId } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current.id) {
        props
          .update(current.id, { ...values, project_id: projectId })
          .then(() => {
            handleCancel();
          });
      } else {
        props.create({ ...values, project_id: projectId }).then(() => {
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
        name: current.name,
      });
    }
  }, [visible]);

  return (
    <CustomModal
      width={720}
      title="Edit taxa's indicators"
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
          <Col xs={24} md={24}>
            <Form.Item
              label="Indicator"
              name="name"
              rules={[{ ...requiredRule, message: "'indicator' is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.indicator.loading,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
