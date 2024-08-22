import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { requiredRule } from "src/helper";
import styled from "styled-components";
import RemoteSelectContainer from "../../ProjectPage/SizeCategory/RemoteSelectContainer";
import RemoteCascadeContainer from "../../ProjectPage/Taxa/RemoteCascadeContainer";
import SurveySelectContainer from "../Report/RemoteSelectContainer";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title {
    font-size: 1.25rem;
  }
`;

function FormContainer(props) {
  const [form] = Form.useForm();
  const { current, visible, projectId } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(current);
      if (current.id) {
        props
          .update(current.id, {
            project_id: projectId,
            report_id: values.report_id,
            type: values.type,
            motiles: values.motiles.map((el) => {
              el.taxa_id = el.taxa_id[1];
              return el;
            }),
          })
          .then(() => {
            handleCancel();
          });
      } else {
        props
          .create({
            project_id: projectId,
            report_id: values.report_id,
            type: values.type,
            motiles: values.motiles.map((el) => {
              el.taxa_id = el.taxa_id[1];
              return el;
            }),
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
    if (current.report_id) {
      let motiles = [];
      current.children.map((motile) => {
        motiles.push({
          ntotal: motile.ntotal,
          size: motile.size,
          notes: motile.notes,
          taxa_id: [motile?.taxa?.category?.id, motile?.taxa?.id],
          size_category_id: motile?.sizeCategory?.id,
        });
      });

      form.setFieldsValue({
        report_id: current.report_id,
        type: current.type,
        motiles: motiles,
      });
    }
  }, [visible]);

  const type = Form.useWatch("type", form);

  const getTaxaFilters = (type) => {
    switch (type) {
      case "fish":
        return { categories: ["fish"] };
      case "macroinvertebrates":
        return { categories: ["macroinv"] };
      case "cryptic":
        return { categories: ["fish", "macroinv"] };
      case "dom_urchin":
        return {
          categories: ["macroinv"],
          species: [
            "Diadema africanum",
            "Sphaerechinus granularis",
            "Arbacia lixula",
            "Centrostephanus longispinus",
            "Paracentrotus lividus",
          ],
        };

      default:
        return { categories: ["macroinv", "fish", "other"] };
    }
  };

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
            <Form.Item label="Sample" name="report_id" rules={requiredRule}>
              <SurveySelectContainer />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Type" name="type" rules={requiredRule}>
              <Select
                options={[
                  { value: "fish", label: "fish" },
                  { value: "macroinvertebrates", label: "macroinvertebrates" },
                  { value: "cryptic", label: "cryptic" },
                  { value: "dom_urchin", label: "dom_urchin" },
                ]}
              />
            </Form.Item>
          </Col>

          <Form.List initialValue={[undefined]} name="motiles">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <>
                    <Col style={{ padding: 0 }} xs={22}>
                      <Flex justify="space-evenly" style={{ width: "100%" }}>
                        <Col xs={24} md={type === "fish" ? 6 : 10}>
                          <Form.Item
                            label={index === 0 ? "Taxa" : ""}
                            name={[index, "taxa_id"]}
                            rules={requiredRule}
                          >
                            <RemoteCascadeContainer
                              species={getTaxaFilters(type).species}
                              projectId={projectId}
                              categories={getTaxaFilters(type).categories}
                            />
                          </Form.Item>
                        </Col>
                        {type === "fish" && (
                          <Col xs={24} md={4}>
                            <Form.Item
                              label={index === 0 ? "Size category" : ""}
                              name={[index, "size_category_id"]}
                            >
                              <RemoteSelectContainer />
                            </Form.Item>
                          </Col>
                        )}

                        {type === "fish" && (
                          <Col xs={24} md={4}>
                            <Form.Item
                              name={[index, "size"]}
                              label={index === 0 ? "Size (cm)" : ""}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        )}

                        <Col xs={24} md={type === "fish" ? 4 : 4}>
                          <Form.Item
                            label={index === 0 ? "ntotal" : ""}
                            name={[index, "ntotal"]}
                            rules={requiredRule}
                          >
                            <InputNumber style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={type === "fish" ? 6 : 10}>
                          <Form.Item
                            label={index === 0 ? "Notes" : ""}
                            name={[index, "notes"]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Flex>
                    </Col>
                    <Col xs={2}>
                      <Flex
                        style={{ width: "100%", height: "100%" }}
                        align="flex-end"
                        justify="flex-end"
                      >
                        <Button
                          disabled={fields?.length <= 1}
                          style={{ width: "100%", marginBottom: "24px" }}
                          danger
                          onClick={() => remove(field.name)}
                        >
                          <MinusCircleOutlined />
                        </Button>
                      </Flex>
                    </Col>
                  </>
                ))}
                <Col xs={24}>
                  <Form.Item>
                    <Button
                      style={{ width: "100%" }}
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add item
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </Col>
              </>
            )}
          </Form.List>
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
