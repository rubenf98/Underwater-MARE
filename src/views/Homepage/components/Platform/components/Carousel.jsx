import styles from "../Platform.module.css";
import { Col } from "antd";

const images = ["placeholder", "placeholder", "placeholder", "placeholder"];

function Carousel() {
  return (
    <>
      {images.map((image, index) => (
        <Col xs={12} md={6} align="center" key={index}>
          <img src={`/assets/${image}.jpg`} className={styles.carouselImages} alt="Images of the different features of the dashboard"/>
        </Col>
      ))}
    </>
  );
}

export default Carousel;
