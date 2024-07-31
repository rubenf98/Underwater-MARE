import { Button, Modal, Upload } from "antd";
import { connect } from "react-redux";
import { updateTaxa } from "../../../../../redux/redux-modules/taxa/actions";
import { UploadOutlined } from "@ant-design/icons";

function AddImageToNewTaxaModal(props) {
  const { open, setOpen } = props;

  console.log(open);

  const submitPhoto = () => {};

  const handleSkip = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Modal"
      open={open}
      onOk={submitPhoto}
      onCancel={handleSkip}
      cancelText={"Submit Later"}
      okText="Submit"
    >
      <p>teste</p>
      <p>teste</p>
      <p>teste</p>
      <p>teste</p>
      <p>teste</p>
      <Upload>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTaxa: (data) => dispatch(updateTaxa(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddImageToNewTaxaModal);
