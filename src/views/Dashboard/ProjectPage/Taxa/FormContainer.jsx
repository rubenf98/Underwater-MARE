import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
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
import { handleArrayToFormData, requiredRule } from "src/helper";
import RemoteSelectContainer from "../Category/RemoteSelectContainer";
import indicator from "../../../../../redux/redux-modules/indicator";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }
`;

function FormContainer(props) {
  const [form] = Form.useForm();
  const [removeIds, setRemoveIds] = useState([]);
  const [sites, setSites] = useState([]);
  const [indicatorList, setIndicatorList] = useState([]);
  const [selectedIndicatorList, setSelectedIndicatorList] = useState([]);

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
        props
          .create({ ...values, project_id: projectId, validated: true })
          .then(() => {
            handleCancel();
          });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    setSelectedIndicatorList([]);
    form.resetFields();
  };

  useEffect(() => {
    var aIndicators = {};

    if (current.id) {
      let currentIndicatorList = [];

      current.indicators.map((currentIndicator) => {
        aIndicators[currentIndicator.name] = currentIndicator.pivot.name;
        currentIndicatorList.push(currentIndicator.name);
      });

      setSelectedIndicatorList(currentIndicatorList);
    }

    form.setFieldsValue({
      category_id: current?.category?.id,
      name: current.name,
      genus: current.genus,
      species: current.species,
      phylum: current.phylum,

      ...aIndicators,
    });
  }, [visible]);

  useEffect(() => {
    if (props.indicators.length && visible) {
      let currentIndicatorList = [];
      props.indicators.map((indicator) => {
        currentIndicatorList.push(indicator.name);
      });
      setIndicatorList(currentIndicatorList);
    }
  }, [props.indicators, visible]);

  return (
    <CustomModal
      width={720}
      title="Edit project's taxa"
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
            <Form.Item label="Category" name="category_id" rules={requiredRule}>
              <RemoteSelectContainer />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Name" name="name" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Genus" name="genus" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Species" name="species" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Phylum" name="phylum" rules={requiredRule}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <p>Indicator(s)</p>
            <Checkbox.Group
              options={indicatorList}
              onChange={(e) => {
                setSelectedIndicatorList(e);
              }}
              value={selectedIndicatorList}
            />
          </Col>
          <Col span={24}>
            {selectedIndicatorList.length ? (
              <p>Indicator(s) value(s)</p>
            ) : (
              <></>
            )}
          </Col>
          {selectedIndicatorList.map((selectedIndicator) => (
            <Col xs={24} md={12}>
              <Form.Item
                key={selectedIndicator}
                label={selectedIndicator}
                name={selectedIndicator}
                rules={requiredRule}
              >
                <Input />
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.project.loading,
    indicators: state.indicator.selector,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
