import { Select } from "antd";
import React, { useEffect } from "react";
import { fetchSelectorCategories } from "../../../../../redux/redux-modules/category/actions";
import { connect } from "react-redux";

function RemoteSelectContainer(props) {
  useEffect(() => {
    props.fetchSelectorCategories();
  }, []);

  return (
    <Select
      onChange={(e) => props.onChange(e)}
      value={props.value}
      showSearch
      fieldNames={{
        label: "name",
        value: "id",
      }}
      options={props.data}
    />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorCategories: (filters) =>
      dispatch(fetchSelectorCategories(filters)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.category.selector,
    loading: state.category.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteSelectContainer);
