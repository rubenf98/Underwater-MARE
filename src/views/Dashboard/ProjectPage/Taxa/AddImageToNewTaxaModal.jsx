import { Modal, Upload } from "antd";
import { connect } from "react-redux";
import { updateTaxa } from "../../../../../redux/redux-modules/taxa/actions";

function AddImageToNewTaxaModal(props) {
    const { open, setOpen } = props;

    console.log(open);

    const submitPhoto = () => {};

    const handleSkip = () => {
        setOpen(false);
    };

    return (
        <Modal 
            open={open}
            onOk={submitPhoto}
            onCancel={handleSkip}
            cancelText={"Submit Later"}
            okText="Submit"
        >
            <Upload />
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTaxa: (data) => dispatch(updateTaxa(data)),
    };
};

export default connect(null, mapDispatchToProps)(AddImageToNewTaxaModal);
