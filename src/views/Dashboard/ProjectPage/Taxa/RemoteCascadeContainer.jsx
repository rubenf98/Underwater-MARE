import { Cascader, Select } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

function RemoteCascadeContainer(props) {
    return (
        <Cascader
            value={props.value}
            showSearch
            fieldNames={{
                label: "name",
                value: "id",
                children: "taxas"
            }}
            expandTrigger="hover"
            options={props.data}
            onChange={props.onChange}
        />
    )
}


const mapStateToProps = (state) => {
    return {
        data: state.taxa.selector,
        loading: state.taxa.loading,
    };
};

export default connect(
    mapStateToProps,
    null
)(RemoteCascadeContainer);