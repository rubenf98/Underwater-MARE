import { Select } from 'antd'
import React, { useEffect } from 'react'
import { fetchSelectorReports } from '../../../../../redux/redux-modules/report/actions'
import { connect } from 'react-redux'

function RemoteSelectContainer(props) {

    useEffect(() => {
        props.fetchSelectorReports({ project: props.projectId })
    }, [])

    const labelRender = (props) => {
        const { label, value } = props;

        return <span>{label} (#{value})</span>;
    };

    return (
        <Select
            value={props.value}
            labelRender={labelRender}
            showSearch
            fieldNames={{
                label: "code",
                value: "id"
            }}
            options={props.data}
            onChange={props.onChange}
        />
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSelectorReports: (filters) => dispatch(fetchSelectorReports(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.report.selector,
        loading: state.report.loading,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoteSelectContainer);