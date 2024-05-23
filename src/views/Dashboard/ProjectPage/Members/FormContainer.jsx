import React, { useEffect } from 'react'
import { Col, Form, Input, Modal, Row, Select } from 'antd'
import { inviteMember } from "../../../../../redux/redux-modules/project/actions";
import styled from "styled-components";
import { connect } from "react-redux";


const CustomModal = styled(Modal)`
    .ant-modal-body {
        padding: 30px 60px;
    } 
`;

const requiredRule = { required: true };

function FormContainer({ visible, setVisible, inviteMember, projectId }) {
    const [form] = Form.useForm();

    const create = () => {
        form.validateFields().then(values => {

            inviteMember({ ...values, project_id: projectId }).then(() => {
                handleCancel();
            });
        });

    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };



    return (
        <CustomModal
            width={720}
            title="Invite a member to the project"
            open={visible}
            onCancel={handleCancel}
            centered
            onOk={create}
        >


            <Form style={{ margin: "50px auto" }} layout="vertical" form={form}
            >
                <Row gutter={32}>
                    <Col span={24}>
                        <Form.Item label="Invite a member through the registration email" name="email" rules={[{ ...requiredRule, message: "'email' is required" }]}>
                            <Input placeholder='example@underwater-survey.org' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>


        </CustomModal>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        inviteMember: (data) => dispatch(inviteMember(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.project.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);