import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const { isAuthenticated } = props;

    const navigate = useNavigate();

    const checkRoute = () => {
        if (isAuthenticated == false) {
            return navigate("/login");
        }
    };

    useEffect(() => {
        checkRoute();
    }, [isAuthenticated]);

    return (
        <React.Fragment>{isAuthenticated ? props.children : null}</React.Fragment>
    );
};
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps)(PrivateRoute);
