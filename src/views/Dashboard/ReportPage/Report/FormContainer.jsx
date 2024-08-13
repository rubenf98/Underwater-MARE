import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { handleArrayToFormData, requiredRule } from "src/helper";
import RemoteCascadeContainer from "../../ProjectPage/Site/RemoteCascadeContainer";
import RemoteSelectContainer from "../../ProjectPage/Depth/RemoteSelectContainer";
import debounce from "debounce";
import { Map, Marker } from "react-map-gl";
import moment from "moment";

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 30px 60px;
  }

  .ant-modal-title{
    font-size: 1.25rem;
  }
`;

function FormContainer(props) {
  const [form] = Form.useForm();
  const [sample, setSample] = useState([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  const [latitude, setLatitude] = useState(32.606889622);
  const [longitude, setLongitude] = useState(-16.8109375);
  const [hasTouched, setHasTouched] = useState([false, false]);

  const { current, visible, projectId } = props;

  const handleOk = () => {
    form.validateFields().then((values) => {
      let initFunctions = [];
      props.functions.map((f) => {
        initFunctions.push({
          function_id: f.id,
          value: values["function_" + f.name],
        });
      });

      var formData = {
        ...values,
        project_id: projectId,
        site_id: values.site[1],
        functions: initFunctions,
      };

      if (current.id) {
        props.update(current.id, formData).then(() => {
          handleCancel();
        });
      } else {
        props.create(formData).then(() => {
          handleCancel();
        });
      }
    });
  };

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  useEffect(() => {
    let isReady = true;
    let string = "";
    sample.map((field, index) => {
      field == undefined && (isReady = false);
      string = string + field;
      if (field && index != sample.length - 1) {
        string = string + "_";
      }
    });

    if (isReady) {
      form.setFieldValue("code", string);
    }
  }, [sample]);

  useEffect(() => {
    if (current.id) {
      let initFunctions = {};
      current.functions.map((f) => {
        initFunctions["function_" + f.name] = f.pivot.user;
      });

      form.setFieldsValue({
        date: moment(current.date),
        code: current.code,
        site: [current.site.locality.id, current.site.id],
        depth_id: current.depth.id,
        heading: current.heading,
        heading_direction: current.heading_direction,
        site_area: current.site_area,
        distance: current.distance,
        daily_dive: current.daily_dive,
        transect: current.transect,
        time: current.time,
        replica: current.replica,
        surveyed_area: current.surveyed_area,
        n: current.n,

        ...initFunctions,
      });

      handlePositionChange({
        lngLat: { lat: current.latitude, lng: current.longitude },
      });
    }
  }, [visible]);

  const handleLatitude = (e) => {
    if (e.target.value < 90 && e.target.value > -90) {
      setLatitude(e.target.value);
      setHasTouched([true, hasTouched[1]]);
    }
  };
  const handleLongitude = (e) => {
    setLongitude(e.target.value);
    setHasTouched([hasTouched[0], true]);
  };

  const handlePositionChange = (e) => {
    setLatitude(e.lngLat.lat);
    setLongitude(e.lngLat.lng);
    setHasTouched([true, true]);

    form.setFieldsValue({ latitude: e.lngLat.lat, longitude: e.lngLat.lng });
  };

  const handleSiteAndLocality = (e) => {
    const locality = props.localities.find((element) => element.id == e[0]);
    const site = locality.sites.find((element) => element.id == e[1]);

    let newSample = [...sample];
    newSample[0] = locality.code;
    newSample[1] = site.code;

    setSample(newSample);
  };

  const handleDepth = (e) => {
    const depth = props.depths.find((element) => element.id == e);

    handleSampleChange("D" + depth.id, 4);
  };

  const handleSampleChange = (value, index) => {
    let newSample = [...sample];
    newSample[index] = value;

    setSample(newSample);
  };

  return (
    <CustomModal
      width={1280}
      title="Create surveys"
      open={visible}
      onCancel={handleCancel}
      centered
      onOk={handleOk}
    >
      <Form
        style={{ margin: "30px auto" }}
        layout="vertical"
        requiredMark
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item label="Sample" name="code" rules={requiredRule}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Date" name="date" rules={requiredRule}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item
              label="Locality and Site"
              name="site"
              rules={requiredRule}
            >
              <RemoteCascadeContainer
                onChange={handleSiteAndLocality}
                projectId={projectId}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Depth" name="depth_id" rules={requiredRule}>
              <RemoteSelectContainer
                onChange={handleDepth}
                projectId={projectId}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item label="Heading" name="heading">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Heading direction" name="heading_direction">
              <Select
                options={[
                  { value: "F", label: "F" },
                  { value: "R", label: "R" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item label="Site area" name="site_area">
              <Input onChange={(e) => handleSampleChange(e.target.value, 2)} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Distance" name="distance">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={12} md={6}>
            <Form.Item
              label="Daily dive#"
              name="daily_dive"
              rules={requiredRule}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="Transect#" name="transect" rules={requiredRule}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="Time#" name="time" rules={requiredRule}>
              <InputNumber
                onChange={(e) => handleSampleChange("Time" + e, 3)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item label="Replica#" name="replica" rules={requiredRule}>
              <InputNumber
                onChange={(e) => handleSampleChange("R" + e, 5)}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={6}>
            <Form.Item
              label="Surveyed area"
              name="surveyed_area"
              rules={requiredRule}
            >
              <Select
                options={[
                  { value: 100, label: 100 },
                  { value: 200, label: 200 },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <h3>Dive team functions</h3>
            <Row gutter={16}>
              {props.functions.map((f) => (
                <Col key={f.id} xs={12} md={6}>
                  <Form.Item
                    label={f.name}
                    name={"function_" + f.name}
                    rules={requiredRule}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Row
              style={{ marginTop: "30px" }}
              align="middle"
              type="flex"
              gutter={32}
            >
              <Col xs={24} md={12}>
                <h3>
                  Introduce coordinates using the inputs below or move the
                  picker on the map to the desired position.
                </h3>
                <Form.Item
                  label="Latitude*"
                  name="latitude"
                  rules={requiredRule}
                >
                  <Input
                    onChange={debounce(handleLatitude, 600)}
                    placeholder="Latitude"
                  />
                </Form.Item>
                <Form.Item
                  label="Longitude*"
                  name="longitude"
                  rules={requiredRule}
                >
                  <Input
                    onChange={debounce(handleLongitude, 600)}
                    placeholder="Longitude"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Map
                  mapboxAccessToken="pk.eyJ1IjoidGlnZXJ3aGFsZSIsImEiOiJjanBncmNscnAwMWx3M3ZxdDF2cW8xYWZvIn0.LVgciVtYclOed_hZ9oXY2g"
                  initialViewState={{
                    latitude: latitude,
                    longitude: longitude,
                    zoom: 7,
                  }}
                  style={{
                    height: "350px",
                    width: "100%",
                  }}
                  mapStyle="mapbox://styles/tigerwhale/cjpgrt1sccjs92sqjfnuixnxc"
                  onClick={handlePositionChange}
                >
                  {!isNaN(latitude) && !isNaN(longitude) && (
                    <Marker
                      draggable
                      latitude={latitude}
                      color="red"
                      longitude={longitude}
                      onDragEnd={handlePositionChange}
                    />
                  )}
                </Map>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.report.loading,
    localities: state.locality.selector,
    depths: state.depth.selector,
    functions: state._function.selector,
  };
};

export default connect(mapStateToProps, null)(FormContainer);
