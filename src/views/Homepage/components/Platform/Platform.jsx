import styles from "./Platform.module.css";
import { Col, Row } from "antd";
import Description from "./components/Description";
import Carousel from "./components/Carousel";

function Platform() {
  return (
    <Row id="about" className={styles.platform} gutter={[32, 32]}>
      <Description />
      <Col xs={24} lg={12} className={styles.platformImage} align="middle">
        <img
          src="/assets/placeholder.jpg"
          alt="Image of the dashboard of the website"
        />
      </Col>
      <Carousel />
      <Col xs={24} className={styles.splitterContainer}>
        <img
          src="/assets/landing.webp"
          alt="Image of two divers doing an underwater visual census survey"
        />
      </Col>
    </Row>
  );
}

export default Platform;
