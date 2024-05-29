import { Cascader, Select } from 'antd'
import React, { useEffect } from 'react'
import { fetchSelectorLocalities } from '../../../../../redux/redux-modules/locality/actions'
import { connect } from 'react-redux'

function RemoteCascadeContainer(props) {

    useEffect(() => {
        props.fetchSelectorLocalities({ project_id: props.projectId })
    }, [])


    return (
        <Cascader
            value={props.value}
            showSearch
            fieldNames={{
                label: "name",
                value: "id",
                children: "sites"
            }}
            expandTrigger="hover"
            options={props.data}
            onChange={props.onChange}
        />
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSelectorLocalities: (filters) => dispatch(fetchSelectorLocalities(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.locality.selector,
        loading: state.locality.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoteCascadeContainer);