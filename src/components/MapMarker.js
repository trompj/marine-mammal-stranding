import React, {Component, useEffect} from 'react';
import ReactMapGL, {
    GeolocateControl,
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl
} from 'react-map-gl'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { HiLocationMarker } from "react-icons/hi";

class MapMarker extends Component {
    state = {
        showPopup: false
    };

    markerClicked() {
        this.state.showPopup = true;
        this.forceUpdate();
    };

    closeMarkerPopup = (showPopup) => {
        this.setState({showPopup: showPopup});
        this.forceUpdate();
    };

    render () {
        return (
            <div className="map-container">
                    {/*{this.state.showPopup &&*/}
                        {/*<a className={"no-link-style"} href={`Trails/${this.props.trailName}`}>*/}
                            {/*<Popup*/}
                                {/*latitude={this.props.latitude}*/}
                                {/*longitude={this.props.longitude}*/}
                                {/*closeButton={true}*/}
                                {/*closeOnClick={false}*/}
                                {/*anchor="top" >*/}
                            {/*>*/}
                            {/*</Popup>*/}
                        {/*</a>*/}
                    {/*}*/}

                    <Marker latitude={this.props.latitude} longitude={this.props.longitude} offsetBottom={16}>
                        <FaMapMarkerAlt className={"marker"} onClick={ () => this.markerClicked() } />
                    </Marker>
            </div>
        )
    }
}

export default MapMarker
