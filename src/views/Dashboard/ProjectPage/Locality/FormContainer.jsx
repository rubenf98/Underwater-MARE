import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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
  const [removeIds, setRemoveIds] = useState([]);
  const [sites, setSites] = useState([]);
  const { current, visible, projectId } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      // var formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("code", values.code);
      // formData.append("project_id", projectId);
      // console.log(values.sites)
      // formData = handleArrayToFormData(formData, values.sites, "sites")

      var formData = {
        name: values.name,
        code: values.code,
        project_id: projectId,
        sites: values.sites,
        removeIDs: removeIds,
      };
      if (current.id) {
        // formData = handleArrayToFormData(formData, removeIds, "removeIds")

        props.update(current.id, formData).then(() => {
          handleCancel();
        });
      } else {
        props.create(formData).then(() => {
          handleCancel();
        });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  const handleSiteRemove = (e, remove, restField) => {
    if (current.id && sites.length > restField.fieldKey) {
      setRemoveIds([...removeIds, sites[restField.fieldKey].id]);
    }
    remove(e);
  };

  useEffect(() => {
    if (current.id) {
      var aSites = [];
      current.sites.map((currentSite) => {
        aSites.push({
          name: currentSite.name,
          code: currentSite.code,
          id: currentSite.id,
        });
      });
      setSites(aSites);

      form.setFieldsValue({
        name: current.name,
        code: current.code,
        sites: aSites,
      });
    }
  }, [visible]);

  return (
    <CustomModal
      width={720}
      title="Edit project's sites and localities"
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
            <Form.Item
              label="Locality"
              name="name"
              rules={[{ ...requiredRule, message: "'locality' is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Code"
              name="code"
              rules={[{ ...requiredRule, message: "'code' is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <p>Site(s)</p>
            <Form.List name="sites">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[
                            { ...requiredRule, message: "'site' is required" },
                          ]}
                        >
                          <Input placeholder="Site Name" />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          {...restField}
                          name={[name, "code"]}
                          rules={[
                            { ...requiredRule, message: "'code' is required" },
                          ]}
                        >
                          <Input placeholder="Site code" />
                        </Form.Item>
                      </Col>
                      <Col span={0}>
                        <Form.Item {...restField} name={[name, "id"]}>
                          <InputNumber style={{ display: "none" }} />
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <div
                          onClick={() =>
                            handleSiteRemove(name, remove, restField)
                          }
                        >
                          -
                        </div>
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add site
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.project.loading,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
