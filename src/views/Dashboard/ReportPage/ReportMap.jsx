import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { fetchReportCoordinates } from "../../../../redux/redux-modules/report/actions";
import { connect } from "react-redux";
import styled from "styled-components";

const PopupContent = styled.div`
    box-sizing: border-box;
    padding: 10px;

    p {
        margin: 0px;

        span {
            font-weight: bold;
        }
    }

    .date {
        margin-bottom: 10px;
        opacity: .6;
    }
`;

function ReportMap(props) {
    const { data, loading } = props;
    const [popupInfo, setPopupInfo] = useState(null);

    useEffect(() => {
        props.fetchReportCoordinates()
    }, []);

    return (
        <div >
            <Map
                mapboxAccessToken="pk.eyJ1IjoidGlnZXJ3aGFsZSIsImEiOiJjanBncmNscnAwMWx3M3ZxdDF2cW8xYWZvIn0.LVgciVtYclOed_hZ9oXY2g"
                initialViewState={{
                    latitude: 32.749234,
                    longitude: -16.986946,
                    zoom: 8,
                }}
                style={{
                    height: "100%",
                    width: "100%",
                    minHeight: "500px",
                }}

                mapStyle="mapbox://styles/tigerwhale/cjpgrt1sccjs92sqjfnuixnxc"
            >


                {data.map((report) => (
                    <Marker
                        key={report.id}
                        latitude={report.latitude}
                        color="red"
                        longitude={report.longitude}
                        onClick={e => {
                            // If we let the click event propagates to the map, it will immediately close the popup
                            // with `closeOnClick: true`
                            e.originalEvent.stopPropagation();
                            setPopupInfo(report);
                        }}
                    />
                ))}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <PopupContent>
                            <p><span>Sample:</span> {popupInfo.code}</p>
                            <p className="date">{popupInfo.date}</p>


                            <a>
                                View more
                            </a>
                        </PopupContent>
                    </Popup>
                )}

            </Map>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReportCoordinates: (filters) => dispatch(fetchReportCoordinates(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.report.coordinates,
        loading: state.report.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportMap);