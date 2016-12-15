import React, { Component } from 'react';
import {render} from 'react-dom'
import { connect } from 'react-redux';
import loadGoogleMapsAPI from 'load-google-maps-api';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';
import * as Utils from '../utils/utils.js';
import InfoWindow from './infoWindow.jsx';

const actionStyle = {
  color: 'white',
  backgroundColor:'purple',
  position: 'fixed',
  top: '80%',
  left: '50%',
  height:'50px',
  width:'240px',
  transform: 'translate(-50%, -50%)'
};

const linkStyle = {
  color:'white',
  'text-decoration':'none'
};

var Coords = {
  latitude: 0,
  longitude: 0
};

class Map extends Component {
  constructor(props, context) {
    super(props, context);

    this.mapInstance = {};
    this.googleMaps = {};
    this.centerMarker = {};

    this.socket = io();

    this.state = {
      feedback: {
        open: false,
        autoHideDuration: 3000,
        message: '',
      }
    }
  }
  componentDidMount() {
    // This is public; restricted by IP
    loadGoogleMapsAPI({
      key: "AIzaSyAHJfNJp8pbRxf_05L1TIm5ru-Dvcla-Nw",
      v: '3.25'
    }).then((googleMaps) => {
      this.initMap(googleMaps); // sets instance vars atm
    });
    // listen for state changes on socket
    var context = this;
    this.socket.on('join', function(boop, user) {
      console.log(user, 'joined', boop);
      context.setState({feedback: {open: true, autoHideDuration: 3000, message: user + ' joined ' + boop }});
    });
  }

  initMap(googleMaps) {
    var context = this;
    console.log('called initMap');
    var context = this;
    var hackReactor = { lat: 37.791066, lng: -122.3991683 }
    var uluru = {lat: -25.363, lng: 131.044};
    // Acquires current location of user
    navigator.geolocation.getCurrentPosition(function(position) {

      // Returned current location of user
      var latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Creates map object for rendering 
      var map = new googleMaps.Map(document.getElementById('map'), {
        zoom: 17,
        center: latlng,
      });

      // Creates a marker at the current location
      // UPDATE: Maybe make it draggable?
      var marker = new googleMaps.Marker({
        position: latlng,
        map: map,
        draggable: true,
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      });

      // Awful, impure pattern, fix:
      context.mapInstance = map;
      context.centerMarker = marker;
      context.googleMaps = googleMaps;

      // UPDATE: Seems unnecessary...
/*      googleMaps.event.addListener(context.mapInstance, 'drag', () => {
        var centerLatLng = map.getCenter();
        context.centerMarker.setPosition(centerLatLng);
      });*/

      // Retrieving from store to render events from db
      Object.keys(context.props.markers).map((key) => {
        context.populateMap(googleMaps, context.props.markers[key]);
      });
    });
  }

  // helper function to populate map with markers of made events
  populateMap(googleMaps, marker) {
    var context = this;
    var newMarker = new googleMaps.Marker({
      map: context.mapInstance,
      position: {
        lat: marker.coords.latitude, 
        lng: marker.coords.longitude,
      }
    });

    var infoWindow = new googleMaps.InfoWindow({
      content: marker.name
    });
    newMarker.addListener('click', function() {
      var div = document.createElement('div');
      render( <InfoWindow user={context.props.user} boop={marker}/>, div );
      infoWindow.setContent( div );
      infoWindow.open(context.mapInstance, newMarker);
    });
  }

  getCoordinates() {
    Coords = {
      latitude: this.mapInstance.getCenter().lat(), 
      longitude: this.mapInstance.getCenter().lng() 
    }; 
    console.log(Coords);
  }

  render() {
    return (
      <div>
        <div id="map"> 
        </div>
        <RaisedButton 
        
        onTouchTap={this.getCoordinates.bind(this)}   
        label ={<Link to='/schedule' style ={linkStyle} >Schedule for this Location</Link> }
        buttonStyle={actionStyle}
        primary = {true}
        // containerElement={<Link to='/schedule'/>}
        fullWidth={false}
        ></RaisedButton>

        <Snackbar
          open={this.state.feedback.open}
          message={this.state.feedback.message}
          autoHideDuration={this.state.feedback.autoHideDuration}/>

      </div>
    )
  }
}

export { Coords }; //there is single-entry point to schedule and it is through maps.

const mapStateToProps = (state) => ({
  user: state.users.user,
  markers : state.markers
});

Map = connect(mapStateToProps)(Map);

export default Map;


