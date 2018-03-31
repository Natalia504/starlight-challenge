import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { itemDetails } from '../reducer';
import parseDate from './../utils';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class ItemDetails extends Component {

    componentDidMount() {
        this.props.itemDetails(this.props.match.params.id);
    }

    render() {
        console.log(this.props.item, this.props.lat, this.props.lng)
        const oneItem = this.props.item.map((e, i) => {
            return <div key={e.id} className=''>
                <div className='row'>Address: {e.location.name}</div>
                <div className='row'>Name: {e.name}</div>
                <div className='row'>ID: {e.id}</div>
                <div className='row'>Serial: {e.serial}</div>
                <div className='row'>Size: {e.size}</div>
                <div className='row'>Date Created: {parseDate(e.createdDate)}</div>
                <div className='row'>Modified On: {parseDate(e.modifiedDate)}</div>
            </div>

        })
        return (
            <div className='found'>
                <Link to="/"><button>Back</button></Link>

                <div className='data'>{oneItem}</div>

                <div>
                    {this.props.lat && this.props.lng ?
                        <Map
                            style={{
                                width: '50%', height: '50%', top: '70%',
                                left: '25%', border: '3px solid red', position: 'relative'
                            }}
                            google={this.props.google}
                            zoom={16}
                            initialCenter={{
                                lat: this.props.lat,
                                lng: this.props.lng
                            }}
                        >
                            <Marker
                                onClick={this.onMarkerClick}
                                name={'Current location'} />
                            <InfoWindow>
                                <div>
                                    <h1>Selected Place</h1>
                                </div>
                            </InfoWindow>
                        </Map>
                        : 'Map is not found'
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        item: state.item,
        lat: state.lat,
        lng: state.lng
    }
}

export default connect(mapStateToProps, { itemDetails })(GoogleApiWrapper({ apiKey: 'AIzaSyDjl5AJyP6VeXtPMjScwjAQORt0rvkOyBE' })(ItemDetails));

// AIzaSyDjl5AJyP6VeXtPMjScwjAQORt0rvkOyBE
//https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap
// export default GoogleApiWrapper({
//   apiKey: (YOUR_GOOGLE_API_KEY_GOES_HERE)
// })(MapContainer)