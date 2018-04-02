import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { itemDetails, setCoordinates } from '../reducer';
import parseDate from './../utils';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import apiKey from '../config';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

// have to use two libraries: google-maps-react & react-places-autocomplete;
// the original data have inaccurate coordinates;
// so, have to look up the correct coordinates by the address with react-places-autocomplete and then feed it to the google-maps-react to get a map. 
// some addresses are inaccurate! Ex:2200 W. Famous Rd, Aurora, CO 80018(no such road);


class ItemDetails extends Component {

    componentDidMount() {
        this.props.itemDetails(this.props.match.params.id)
        .then(() => geocodeByAddress(this.props.address)
            .then(results => getLatLng(results[0]))
            .then(results => this.props.setCoordinates(results))
            .catch(error => console.error('Error', error))
        )
    }

    render() {

        const oneItem = this.props.item.map((e, i) => {
            return <div key={e.id} className=''>
                <div className='row'>Name: {e.name}</div>
                <div className='row'>Location: {e.location.name}</div>
                <div className='row'>Size: {e.size}</div>
                <div className='row'>ID: {e.id}</div>
                <div className='row'>Serial: {e.serial}</div>
                <div className='row'>Date Created: {parseDate(e.createdDate)}</div>
                <div className='row'>Modified On: {parseDate(e.modifiedDate)}</div>
            </div>
        })

        return (
            <div className='found'>
                <Link to="/"><button onClick={() => this.props.setCoordinates({})}>Back</button></Link>

                <div className='data'>{oneItem}</div>

                <div className='map'>
                    {Object.keys(this.props.latLng).length !== 0 ?
                        <Map
                            style={{
                                width: '60%',
                                height: '50%',
                                margin: 'auto',
                                border: '1px solid grey',
                                position: 'relative'
                            }}
                            google={this.props.google}
                            zoom={16}
                            initialCenter={ this.props.latLng }
                        >
                            <Marker
                                onClick={this.onMarkerClick}
                                name={'location'} />
                            <InfoWindow>
                                <div>
                                    <h1>Selected Place</h1>
                                </div>
                            </InfoWindow>
                        </Map>
                        : <div>Map is not available!</div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        item: state.item,
        latLng: state.latLng,
        address: state.address
    }
}

export default connect(mapStateToProps, { itemDetails, setCoordinates })(GoogleApiWrapper({ apiKey: apiKey.key })(ItemDetails));