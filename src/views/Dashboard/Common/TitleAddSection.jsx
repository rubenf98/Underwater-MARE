import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: #044582ff;
    padding: 7px;
    box-sizing: border-box;
    box-shadow: 0px;
    border: 0px;
    cursor: pointer;
    border-radius: 4px;

    img {
      width: 13px;
    }
  }
`;
function TitleAddSection(props) {
  const { permissions = [], hideAdd, title, handleClick } = props;

  return (
    <Container>
      <h2>{title}</h2>
      {!hideAdd && permissions.includes("create") && (
        <button onClick={handleClick}>
          <img
            src="/assets/icons/add.svg"
            alt="add icon to create a new entry"
          />
        </button>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    permissions: state.permissions.data,
  };
};

export default connect(mapStateToProps, null)(TitleAddSection);
