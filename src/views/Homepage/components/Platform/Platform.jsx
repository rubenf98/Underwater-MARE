import styles from "./Platform.module.css";
import { Col, Row } from "antd";
import Description from "./components/Description";
import Carousel from "./components/Carousel";

function Platform() {
  return (
    <Row id="platform" gutter={16} justify={"center"}>
      <Description />
      <Col xs={24} lg={12}>
        <p>Platform image</p>
      </Col>
      <Carousel />
    </Row>
  );
}

export default Platform;
