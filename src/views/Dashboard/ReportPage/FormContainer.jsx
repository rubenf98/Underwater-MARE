import React, { useEffect } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd'
import { createReport } from "../../../../redux/redux-modules/report/actions";
import styled from "styled-components";
import { connect } from "react-redux";


const CustomModal = styled(Modal)`
    .ant-modal-body {
        padding: 30px 60px;
    } 
`;

const requiredRule = { required: true };

function FormContainer({ visible, setVisible, currentUser, updateUser }) {
    const [form] = Form.useForm();

    const create = () => {
        form.validateFields().then(values => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("role", values.role);

            updateUser(currentUser.id, formData).then(() => {
                handleCancel();
            });
        });

    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };

    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                name: currentUser.name,
                email: currentUser.email,
            });
        }

    }, [visible])


    return (
        <CustomModal
            width={1200}
            title="Invite member"
            visible={visible}
            onCancel={handleCancel}
            centered
            onOk={create}
        >


            <Form style={{ margin: "50px auto" }} layout="vertical" hideRequiredMark form={form}
            >
                <Row gutter={32}>
                    <Col xs={24} md={12}>
                        <Form.Item label="Email*" name="email" rules={[{ ...requiredRule, message: "'email' is required" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>


        </CustomModal>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMember: (id, data) => dispatch(addMember(id, data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.project.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);