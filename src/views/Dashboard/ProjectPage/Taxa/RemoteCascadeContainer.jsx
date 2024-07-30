import { Button, Cascader, Divider, Flex, Input, Select } from "antd";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { createTaxa } from "../../../../../redux/redux-modules/taxa/actions";
import { useState } from "react";

function RemoteCascadeContainer(props) {
    const [newTaxaName, setNewTaxaName] = useState();
    const [newTaxaCategoryId, setNewTaxaCategoryId] = useState();
    const { data, onChange, value, projectId } = props;

    return (
        <Cascader
            value={value}
            showSearch
            fieldNames={{
                label: "name",
                value: "id",
                children: "taxas",
            }}
            expandTrigger="hover"
            options={data}
            onChange={onChange}
            dropdownRender={(menus) => {
                return (
                    <div
                        onClick={(e) =>
                            e.stopPropagation() && e.preventDefault()
                        }
                    >
                        {menus}
                        <Divider />
                        <Flex>
                            <Select
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
                            <Input
                                placeholder="Create new"
                                onChange={(e) => setNewTaxaName(e.target.value)}
                            />
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                loading={false}
                                style={{ aspectRatio: 1, flexShrink: 0 }}
                                popupMatchSelectWidth={false}
                                onClick={() =>
                                    props.createTaxa({
                                        name: newTaxaName,
                                        genus: newTaxaName,
                                        project_id: projectId,
                                        category_id: newTaxaCategoryId,
                                    })
                                }
                            />
                        </Flex>
                    </div>
                );
            }}
        />
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTaxa: (data) => dispatch(createTaxa(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.taxa.selector,
        loading: state.taxa.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoteCascadeContainer);
