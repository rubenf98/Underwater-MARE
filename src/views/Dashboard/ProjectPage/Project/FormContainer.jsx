import React, { useEffect, useState } from 'react'
import { Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select, Space } from 'antd'
import { fetchSelfProjects } from "../../../../../redux/redux-modules/project/actions";
import styled from "styled-components";
import { connect } from "react-redux";
import { handleArrayToFormData } from 'src/helper';
import { title } from 'process';


const CustomModal = styled(Modal)`
    .ant-modal-body {
        padding: 30px 60px;
    } 
`;

const requiredRule = { required: true };

function FormContainer(props) {
    const [form] = Form.useForm();
    const { visible } = props

    const handleOk = () => {
        form.validateFields().then(values => {

            props.create(values).then(() => {
                handleCancel();
                props.fetchSelfProjects()
            });



        });

    };

    const handleCancel = () => {
        props.handleCancel();
        form.resetFields();
    };


    return (
        <CustomModal
            width={720}
            title="Create a new project"
            open={visible}
            onCancel={handleCancel}
            centered
            onOk={handleOk}
        >


            <Form initialValues={{ public: true }} style={{ margin: "30px auto" }} layout="vertical" requiredMark form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Title" name="name" rules={[{ ...requiredRule, message: "'Title' is required" }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Description" name="description" rules={[{ ...requiredRule, message: "'Description' is required" }]}>
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item valuePropName="checked" label="Is it a public or private project?" name="public">
                            <Checkbox>Public</Checkbox>
                        </Form.Item>
                    </Col>



                </Row>
            </Form>


        </CustomModal>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSelfProjects: () => dispatch(fetchSelfProjects()),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.project.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);