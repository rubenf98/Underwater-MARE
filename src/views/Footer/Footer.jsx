import { Col, Divider, Row } from "antd";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import {
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  XOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const logoPaths = [
  "logoMARE",
  "logoWave",
  "logoArditi",
  "logoArnet",
  "logoUMa",
  "logoFCT",
];

function Footer() {
  return (
    <div className={styles.container}>
      <Divider style={{ borderTop: "1px solid grey" }} />
      <Row gutter={[16, 16]} justify={"space-around"} align={"middle"}>
        {logoPaths.map((element, index) => (
          <Col key={index} lg={2} md={3} sm={4} xs={6}>
            <div className={styles.logos}>
              <img
                src={`/assets/logos/${element}.webp`}
                alt="Logos of funders"
              />
            </div>
          </Col>
        ))}
      </Row>

      <div className={styles.description}>
        <p>©{new Date().getFullYear()} | MARE-Madeira</p>
        <p>Contact: team@wave-labs.org</p>
      </div>

      <Row className={styles.socialLogos} align={"middle"}>
        <Link to={"https://mare-madeira.pt/"} target="_blank">
          <GlobalOutlined />
        </Link>
        <Link
          to={"https://www.instagram.com/mare_madeira/?hl=en"}
          target="_blank"
        >
          <InstagramOutlined />
        </Link>
        <Link to={"https://www.youtube.com/@mare-madeira"} target="_blank">
          <YoutubeOutlined />
        </Link>
        <Link to={"https://www.facebook.com/MARE.Madeira"} target="_blank">
          <FacebookOutlined />
        </Link>
        <Link to={"https://twitter.com/MARE_Madeira"} target="_blank">
          <XOutlined />
        </Link>
        <Link
          to={"https://www.linkedin.com/company/mare-madeira/"}
          target="_blank"
        >
          <LinkedinOutlined />
        </Link>
      </Row>
    </div>
  );
}

export default Footer;
