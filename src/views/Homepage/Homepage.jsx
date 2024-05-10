import styles from "./Homepage.module.css";
import { Col, Row } from "antd";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Methods from "./components/Methods/Methods";
import Platform from "./components/Platform/Platform";
import styled from 'styled-components'

const FullSectionImage = styled.img`
    width: 100%;
    max-height: 60vh;
    object-fit: cover;
    margin: 100px 0px;
`;

function Homepage() {
    return (
        <>
            <Row className={styles.homeContainer}>
                <Col xs={24}>
                    <Home />
                </Col>
            </Row>
            <Row className={styles.container} justify={"center"}>
                <Col xs={24}>
                    <Platform />
                </Col>
            </Row>

            <FullSectionImage
                src="/assets/images/banner.jpg"
                alt="Image of three divers doing an underwater visual census survey"
            />
            <Row className={styles.container} justify={"center"}>
                <Col xs={24}>
                    <Methods />
                </Col>
                <Col xs={24}>
                    <Contact />
                </Col>
            </Row>
        </>
    );
}

export default Homepage;
