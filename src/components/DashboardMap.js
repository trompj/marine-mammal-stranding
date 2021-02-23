import ReactMapGL from "./Dashboard";
import {GeolocateControl, NavigationControl} from "react-map-gl";
import React, {Component} from "react";

const TOKEN="pk.eyJ1IjoianQyMjUiLCJhIjoiY2tsNHJ6ZmduMXd1cTJwcGx4MDN2eHlwYyJ9.sJrdVXyR9hTFkEKYDjysjA";

const geolocateStyle = {
    float: 'right',
    margin: '46px',
    padding: '9px'
};

const navStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
};

class DashboardMap extends Component {
    componentDidMount() {
        // fetch('https://backcountry-api-289918.wm.r.appspot.com/trails')
        //     .then(res => res.json())
        //     .then((data) => {
        //         this.setState({ trails: data });
        //     })
        //     .catch(console.log)
    }
    //
    state = {
        trails: [],
        viewport: {
            latitude: 47.5,
            longitude: -120.7401,
            zoom: 6
        },
        showPopup: true
    };

    onViewportChange = viewport => {
        let {width, height, ...etc} = viewport;
        this.setState({viewport: etc})
    };

    setSelectedMarker = (index) => {
        this.setState({ selectedIndex: index })
    };

    _onViewportChange = (viewport) => {
        viewport.zoom=8; //Whatever zoom level you want
        this.setState({ viewport })
    };

    render () {
        const {
            viewport
        } = this.state;
        return (
            <div>
                <div className="map-container">
                    <ReactMapGL
                        width='100%'
                        height='100%'
                        {...viewport}
                        mapboxApiAccessToken={TOKEN}
                        mapStyle="mapbox://styles/mapbox/outdoors-v11"
                        onViewportChange={viewport => this.onViewportChange(viewport)}
                    >

                        <GeolocateControl
                            onViewportChange={this._onViewportChange}
                            style={geolocateStyle}
                            positionOptions={{enableHighAccuracy: true}}
                            trackUserLocation={true}
                            zoom={9}
                        />

                        {/*{ (this.state.trails.trails !== undefined) && this.state.trails.trails.map(({fields}, i) =>*/}
                            {/*<MapMarker*/}
                                {/*trailName={this.state.trails.trails[i].name}*/}
                                {/*latitude={this.state.trails.trails[i].latitude}*/}
                                {/*longitude={this.state.trails.trails[i].longitude}*/}
                                {/*distance={this.state.trails.trails[i].distance}*/}
                                {/*images={this.state.trails.trails[i].images}*/}
                                {/*elevationGain={this.state.trails.trails[i].elevation_gain}*/}
                                {/*rating={this.state.trails.trails[i].review_rating}*/}
                            {/*/>*/}
                        {/*)}*/}

                        <div className="nav" style={navStyle}>
                            <NavigationControl />
                        </div>
                    </ReactMapGL>
                </div>
            </div>
        )
    }
}

export default DashboardMap
