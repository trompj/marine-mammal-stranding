import '../styles/Dashboard.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import React, {Component, useEffect, useState} from 'react';
import ReactMapGL, {
    GeolocateControl,
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {Col, Container, Row} from "reactstrap";
import MapMarker from "./MapMarker";
import DashboardMap from "./DashboardMap";

const TOKEN="pk.eyJ1IjoianQyMjUiLCJhIjoiY2tsNHJ6ZmduMXd1cTJwcGx4MDN2eHlwYyJ9.sJrdVXyR9hTFkEKYDjysjA";

const geolocateStyle = {
    position: 'relative',
    float: 'right',
    margin: '15px',
    padding: '10px'
};

const navStyle = {
    position: 'absolute',
    top: 15,
    left: 0,
    padding: '10px'
};

export const Dashboard = () => {
    const[viewport, setViewport] = useState({
        latitude: 47.5,
        longitude: -120.7401,
        zoom: 6
    });

    const { user, getAccessTokenSilently, getAccessTokenWithPopup, loginWithRedirect, isAuthenticated } = useAuth0();

    let strandings = [];

    // let state = {
    //     viewport: {
    //         latitude: 47.5,
    //         longitude: -120.7401,
    //         zoom: 6
    //     },
    //     showPopup: true
    // };

    // let onViewportChange = viewport => {
    //     let {width, height, ...etc} = viewport;
    //     state.viewport = etc;
    //     // this.setState({viewport: etc})
    // };

    // let setSelectedMarker = (index) => {
    //     this.setState({ selectedIndex: index })
    // };
    //
    // let _onViewportChange = (viewport) => {
    //     viewport.zoom=8; //Whatever zoom level you want
    //     this.setState({ viewport });
    //
    // };

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-97ard54a.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });
                const userDetailsByIdUrl = `http://127.0.0.1:8080/strandings`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        'HTTP_AUTHORIZATION': `Bearer ${accessToken}`,
                    },
                });

                const strandingJson = await metadataResponse.json();
                strandings = strandingJson.strandings;
                console.log(strandings);

            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, []);

    return (
        <div>
            {isAuthenticated && (
                <div className="flex">
                    <div className="map-container">
                        <ReactMapGL
                            width='100%'
                            height='100%'
                            {...viewport}
                            onViewportChange={setViewport}
                            mapboxApiAccessToken={TOKEN}
                            mapStyle="mapbox://styles/mapbox/outdoors-v11"
                        >
                            <GeolocateControl
                                onViewportChange={setViewport}
                                style={geolocateStyle}
                                positionOptions={{enableHighAccuracy: true}}
                                trackUserLocation={true}
                                zoom={9}
                            />

                            <div className="nav" style={navStyle}>
                                <NavigationControl />
                            </div>
                        </ReactMapGL>
                    </div>
                    <div className="dashboard-container">
                        STRANDING INFO
                    </div>
                </div>
            )}
            {!isAuthenticated && (
                loginWithRedirect()
            )}
        </div>
    );
};

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <div>loading...</div>,
});
