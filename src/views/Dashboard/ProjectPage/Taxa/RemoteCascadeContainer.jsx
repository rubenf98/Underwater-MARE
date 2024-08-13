import {
  Button,
  Cascader,
  Divider,
  Flex,
  Input,
  Popover,
  Select,
  Tooltip,
} from "antd";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import {
  createTaxa,
  fetchSelectorTaxas,
} from "../../../../../redux/redux-modules/taxa/actions";
import { useState } from "react";
import AddImageToNewTaxaModal from "./AddImageToNewTaxaModal";
import styled from "styled-components";

function RemoteCascadeContainer(props) {
  const [openCascader, setOpenCascader] = useState(false);
  const [photoUploadTaxaId, setPhotoUploadTaxaId] = useState(false);
  const [newTaxaName, setNewTaxaName] = useState();
  const [createTaxaError, setCreateTaxaError] = useState();
  const [newTaxaCategoryId, setNewTaxaCategoryId] = useState(1);
  const { data, onChange, value, projectId, categories } = props;

  return (
    <>
      <Cascader
        open={openCascader}
        onMouseDown={() => setOpenCascader(true)}
        value={value}
        showSearch
        fieldNames={{
          label: "name",
          value: "id",
          children: "taxas",
        }}
        expandTrigger="hover"
        options={
          categories ? data.filter((el) => categories.includes(el.name)) : data
        }
        onChange={(e) => {
          setOpenCascader(false);
          onChange(e);
        }}
        dropdownRender={(menus) => {
          return (
            <>
              <div
                onClick={() => setOpenCascader(false)}
                style={{
                  position: "fixed",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  zIndex: 100,
                }}
              />
              <div style={{ zIndex: 200, position: "relative" }}>
                {menus}
                <Divider />
                <Flex>
                  <Select
                    defaultValue={1}
                    onChange={(e) => setNewTaxaCategoryId(e)}
                    options={data}
                    fieldNames={{ label: "name", value: "id" }}
                    dropdownRender={(menu) => (
                      <div
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        {menu}
                      </div>
                    )}
                  />
                  <Tooltip
                    open={createTaxaError}
                    trigger={null}
                    title="Name taken"
                    color="#ff4949"
                  >
                    <Input
                      style={{
                        borderColor: createTaxaError ? "#ff4949" : null,
                      }}
                      placeholder="Create new"
                      onChange={(e) => setNewTaxaName(e.target.value)}
                    />
                  </Tooltip>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    loading={props.loading}
                    style={{ aspectRatio: 1, flexShrink: 0 }}
                    popupMatchSelectWidth={false}
                    onClick={async () => {
                      try {
                        let res = await props.createTaxa({
                          name: newTaxaName,
                          genus: newTaxaName,
                          project_id: projectId,
                          category_id: newTaxaCategoryId,
                        });

                        await props.fetchSelectorTaxas({
                          project_id: projectId,
                        });

                        onChange([
                          newTaxaCategoryId,
                          res?.value?.data?.data?.id,
                        ]);
                        setOpenCascader(false);

                        //Open popup to insert photo
                        setPhotoUploadTaxaId(res?.value?.data?.data?.id);
                      } catch (err) {
                        setCreateTaxaError(err);
                      }
                    }}
                  />
                </Flex>
              </div>
            </>
          );
        }}
      />
      <AddImageToNewTaxaModal
        taxaId={photoUploadTaxaId}
        setTaxaId={setPhotoUploadTaxaId}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectorTaxas: (filters) => dispatch(fetchSelectorTaxas(filters)),
    createTaxa: (data) => dispatch(createTaxa(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.taxa.selector,
    state: state.taxa,
    loading: state.taxa.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteCascadeContainer);
