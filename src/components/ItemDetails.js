import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { itemDetails } from '../reducer';
import parseDate from './../utils';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import apiKey from '../config';

class ItemDetails extends Component {

    componentDidMount() {
        this.props.itemDetails(this.props.match.params.id);
    }
    onMarkerClick(){
        return this.props.item.map(e => e.location.name)
    }

    render() {
        console.log(this.props.item, this.props.lat, this.props.lng)
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
        const address = this.props.item.map((e, i) => {
            return <div key={e.id} className=''>
                <div className='row'>Address: {e.location.name}</div>
                </div>
                })
        return (
            <div className='found'>
                <Link to="/"><button>Back</button></Link>

                <div className='data'>{oneItem}</div>

                <div className='map'>
                    {this.props.lat && this.props.lng ?
                        <Map
                            style={{
                                width: '80%', height: '80%', margin: 'auto', border: '1px solid grey', position: 'relative'
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
                                name={address} />
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

export default connect(mapStateToProps, { itemDetails })(GoogleApiWrapper({ apiKey: apiKey.key })(ItemDetails));