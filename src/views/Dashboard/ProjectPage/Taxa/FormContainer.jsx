import { Checkbox, Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";
import RemoteSelectContainer from "../TaxaCategory/RemoteSelectContainer";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }
`;

function FormContainer(props) {
  const [form] = Form.useForm();
  const [indicatorList, setIndicatorList] = useState([]);
  const [selectedIndicatorList, setSelectedIndicatorList] = useState([]);

  const { current, visible, projectId } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      let indicators = {};

      Object.keys(values)
        .filter((key) => key.includes("indicators"))
        .map((key) => {
          let indicator = key.split(".")[1];
          indicators[indicator] = values[key];
        });

      if (current.id) {
        props
          .update(current.id, {
            indicators,
            project_id: projectId,
            id: current.id,
            category_id: values?.category_id,
            name: values.name,
            genus: values.genus,
            species: values.species,
            phylum: values.phylum,
          })
          .then(() => {
            handleCancel();
          });
      } else {
        props
          .create({
            indicators,
            project_id: projectId,
            validated: true,
            category_id: values?.category_id,
            name: values.name,
            genus: values.genus,
            species: values.species,
            phylum: values.phylum,
          })
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
        aIndicators["indicators." + currentIndicator.name] =
          currentIndicator.pivot.name;
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
          {selectedIndicatorList.map((selectedIndicator, i) => (
            <Col key={i} xs={24} md={12}>
              <Form.Item
                key={selectedIndicator}
                label={selectedIndicator}
                name={"indicators." + selectedIndicator}
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
