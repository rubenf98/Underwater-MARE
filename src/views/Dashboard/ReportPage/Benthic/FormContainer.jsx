import React, { useEffect } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import RemoteCascadeContainer from "../../ProjectPage/Taxa/RemoteCascadeContainer";
import { fetchSelectorTaxas } from "../../../../../redux/redux-modules/taxa/actions";
import { fetchSelectorSubstrates } from "../../../../../redux/redux-modules/substrate/actions";

import ReportRemoteSelectContainer from "../Report/RemoteSelectContainer";
import SubstrateRemoteSelectContainer from "../../ProjectPage/Substrate/ExternalRemoteSelectContainer";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

function FormContainer(props) {
  const { current, visible, projectId } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current.report_id) {
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
    if (visible) {
      props.fetchSelectorSubstrates({ project_id: projectId });
      props.fetchSelectorTaxas({ project_id: projectId });

      if (current.report_id) {
        var newBenthics = [];
        current.children.map((benthic) => {
          newBenthics.push({
            ...benthic,
            taxa_id: benthic?.taxa?.id
              ? [benthic?.taxa?.category?.id, benthic?.taxa?.id]
              : undefined,
          });
        });

        form.setFieldsValue({
          benthics: newBenthics,
          report_id: current.report_id,
        });
      } else {
        // Init p## field for 100 transects
        a = new Array(2);
        for (var i = 0, a = []; i < 20; a[i++] = { p: i });

        form.setFieldValue("benthics", a);
      }
    }
  }, [visible]);

  return (
    <CustomModal
      width={1200}
      title="Fill the benthic data"
      open={visible}
      onCancel={handleCancel}
      centered
      onOk={handleOk}
    >
      <Form style={{ margin: "50px auto" }} layout="vertical" form={form}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item label="Sample" name="report_id" rules={requiredRule}>
              <ReportRemoteSelectContainer projectId={projectId} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.List name="benthics">
              {(fields) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} justify="space-between">
                      <Col span={3}>
                        <Form.Item
                          {...restField}
                          label="P##"
                          name={[name, "p"]}
                          rules={requiredRule}
                        >
                          <Input disabled />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          label="Substrate"
                          name={[name, "substrate_id"]}
                          rules={requiredRule}
                        >
                          <SubstrateRemoteSelectContainer
                            projectId={projectId}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          label="Taxa"
                          name={[name, "taxa_id"]}
                        >
                          <RemoteCascadeContainer
                            categories={["macroinv", "algae", "other"]}
                            projectId={projectId}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          label="Notes"
                          name={[name, "notes"]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </>
              )}
            </Form.List>
          </Col>

          {/* {current.id ?

                        : Array(100).map((benthic) => (
                            <Col xs={24} md={12}>
                                <Form.Item label="Email*" name="p##" rules={[{ ...requiredRule, message: "'email' is required" }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        ))
                    } */}
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorTaxas: (filters) => dispatch(fetchSelectorTaxas(filters)),
    fetchSelectorSubstrates: (filters) =>
      dispatch(fetchSelectorSubstrates(filters)),
  };
};

export default connect(null, mapDispatchToProps)(FormContainer);
