import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";
import { fetchSelectorSubstrates } from "../../../../../redux/redux-modules/substrate/actions";
import { fetchSelectorTaxas } from "../../../../../redux/redux-modules/taxa/actions";
import RemoteCascadeContainer from "../../ProjectPage/Taxa/RemoteCascadeContainer";

import SubstrateRemoteSelectContainer from "../../ProjectPage/Substrate/ExternalRemoteSelectContainer";
import ReportRemoteSelectContainer from "../Report/RemoteSelectContainer";
import {
  createBenthic,
  updateBenthic,
} from "../../../../../redux/redux-modules/benthic/actions";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

function FormContainer(props) {
  const { current, visible, projectId, create, update, loading, taxas } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (current.report_id) {
        update(current.id, { ...values, project_id: projectId }).then(() => {
          handleCancel();
        });
      } else {
        create({ ...values, project_id: projectId }).then(() => {
          handleCancel();
        });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  const handleFill = () => {
    let values = form.getFieldsValue();
    let benthicsBeforeFill = values.benthics;
    let benthicsAfterFill = [];
    let substrate = null,
      taxa = [];

    let other_taxa = taxas.find((el) => el.name === "other");
    let bare_taxa = other_taxa?.taxas?.find((el) => el.name === "Bare");
    let bare = [other_taxa.id, bare_taxa.id];

    benthicsBeforeFill.forEach((benthic) => {
      let row = {};
      if (benthic.substrate_id) {
        substrate = benthic.substrate_id;
        row.substrate_id = benthic.substrate_id;
      } else {
        if (substrate) {
          row.substrate_id = substrate;
        } else {
          message.error({
            content: "You need to fill P##1's substrate",
            key: "first-substrate-error",
          });
        }
      }

      if (benthic.taxa_id?.length > 0) {
        taxa = benthic.taxa_id;
        row.taxa_id = benthic.taxa_id;
      } else {
        if (taxa?.length > 0) {
          row.taxa_id = taxa;
        } else {
          //other - Bare
          row.taxa_id = bare;
          console.log("bare");
        }
      }
      row.notes = benthic.notes;
      row.p = benthic.p;

      benthicsAfterFill.push(row);
    });

    form.setFieldsValue({
      benthics: benthicsAfterFill,
    });
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
        for (var i = 0, a = []; i < 100; a[i++] = { p: i });

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
      footer={[
        <Button key="fill" onClick={handleFill}>
          Fill
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button loading={loading} key="link" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
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
                          rules={requiredRule}
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

const mapStateToProps = (state) => {
  return {
    loading: state.benthic.loading,
    taxas: state.taxa.selector,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorTaxas: (filters) => dispatch(fetchSelectorTaxas(filters)),
    fetchSelectorSubstrates: (filters) =>
      dispatch(fetchSelectorSubstrates(filters)),
    update: (id, data) => dispatch(updateBenthic(id, data)),
    create: (data) => dispatch(createBenthic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
