import styles from "./Contact.module.css";
import { Row, Col } from "antd";
import ContactForm from "./components/ContactForm";

function Contact() {
    return (
        <Row id="contact" className={styles.container} justify="center">
            <Col xs={24} lg={12} className={styles.contactText} align="middle">
                <h1>Ask us a question.</h1>
                <h2>We'll answer as soon as possible</h2>
            </Col>
            <Col xs={24} lg={12} align="middle">
                <ContactForm />
            </Col>
        </Row>
    );
}

export default Contact;
