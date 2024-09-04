import React, { useEffect } from "react";
import styled from "styled-components";
import Statistics from "./Statistics";
import Members from "./Members/Members";
import Locality from "./Locality/Locality";
import { Col, message, Row } from "antd";
import Taxa from "./Taxa/Taxa";
import { useNavigate, useParams } from "react-router-dom";
import Indicator from "./Indicator/Indicator";
import Depth from "./Depth/Depth";
import Function from "./Function/Function";
import axiosConfig from "src/axiosConfig";
import { connect } from "react-redux";
import { fetchPermissions } from "../../../../redux/redux-modules/permissions/actions";

const Container = styled.section`
  width: 100%;
  margin: 50px 0px;
  box-sizing: border-box;
`;

function ProjectPage(props) {
  let { id } = useParams();
  const { fetchPermissions } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    axiosConfig.defaults.headers.common["project"] = id;

    fetchPermissions(id).catch((err) => {
      if (err.response.status === 403) {
        messageApi.open({
          type: "error",
          content: "You don't have access to this project",
        });
        navigate("/dashboard");
      }
    });
  }, [id]);

  return (
    <Container>
      {contextHolder}
      {/* TODO: DEPTHS, SUBTRATES AND FUNCTIONS TABLES */}
      <Row>
        <Statistics projectId={id} />
      </Row>
      <Row gutter={64}>
        <Col md={24} lg={12}>
          <Members projectId={id} />
        </Col>
        <Col md={24} lg={12}>
          <Locality projectId={id} />
        </Col>
      </Row>
      <Row>
        <Taxa projectId={id} />
      </Row>
      <Row gutter={64}>
        <Col md={24} lg={8}>
          <Indicator projectId={id} />
        </Col>
        <Col md={24} lg={8}>
          <Depth projectId={id} />
        </Col>
        <Col md={24} lg={8}>
          <Function projectId={id} />
        </Col>
      </Row>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPermissions: (id) => dispatch(fetchPermissions(id)),
  };
};

export default connect(null, mapDispatchToProps)(ProjectPage);
