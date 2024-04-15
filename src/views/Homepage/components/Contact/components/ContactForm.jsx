import styles from "../Contact.module.css";
import { Button, Form, Input, message } from "antd";
import { connect } from "react-redux";
import { createContact } from "redux_modules/contact/actions";

const { TextArea } = Input;

function ContactForm(props) {
  const { loading } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (formFields) => {
    formFields.section = "contact";
    formFields.subject = "Underwater MARE";
    props
      .createContact(formFields)
      .then((data) => {
        message.success(data.value.data.message, 5);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  return (
    <Form onFinish={onFinish} className={styles.formContainer}>
      {contextHolder}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Email is required!",
          },
          {
            type: "email",
            message: "Please use a valid email!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="message"
        rules={[
          {
            required: true,
            message: "Please write your message!",
          },
        ]}
      >
        <TextArea placeholder="Write your message..." rows={4} />
      </Form.Item>

      <Form.Item className={styles.buttonContainer}>
        <Button htmlType="submit" loading={loading}>
          Send message
        </Button>
      </Form.Item>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.contact.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: (data) => dispatch(createContact(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
