import React, { Component } from 'react';
import {render, unmountComponentAtNode} from 'react-dom'
import { connect } from 'react-redux';
import { joinBoop, leaveBoop } from '../actions/index.js';
import loadGoogleMapsAPI from 'load-google-maps-api';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';
import * as Utils from '../utils/utils.js';
import InfoWindow from './infoWindow.jsx';
import ReduxThunk from 'redux-thunk';

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
    this.state = {
      boopId: 0,
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
  }

  initMap(googleMaps) {
    var context = this;
    console.log('called initMap');
    var context = this;
    var hackReactor = { lat: 37.791066, lng: -122.3991683 }
    var uluru = {lat: -25.363, lng: 131.044};
    // Acquires current location of user
    //navigator.geolocation.getCurrentPosition(function(position) {

      // Returned current location of user
/*      var latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };*/

      // Creates map object for rendering 
      var map = new googleMaps.Map(document.getElementById('map'), {
        zoom: 17,
        center: hackReactor,
      });

      // Creates a marker at the current location
      var marker = new googleMaps.Marker({
        position: hackReactor,
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
      
      // Retrieving from store to render events on the map
      Object.keys(context.props.markers).map((key) => {
        context.populateMap(googleMaps, context.props.markers[key]);
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

    // appends infowindow react component to google marker infowindow
    var infoWindow = new googleMaps.InfoWindow();
    newMarker.addListener('click', function() {
      var div = document.createElement('div');
      div.id = marker.refId;
      div.className += 'infoWindow';

      // checks if the user id is present within the joinedUSers array and returns true within joined
      render( <InfoWindow joined={context.props.markers[marker.refId].joinedUsers.find((element) => element === context.props.user._id) === undefined ? false : true} 
        user={context.props.user} boop={context.props.markers[marker.refId]} join={(boopId, userId) => context.join(boopId, userId)} leave={(boopId, userId) => context.leave(boopId, userId)}/>, div );
      infoWindow.setContent( div );
      infoWindow.open(context.mapInstance, newMarker);
    });
  }

  // dispatches an action to the storage for appending the userId to the boop that was joined in the infoWindow component
  join(boopId, userId) {
    // update redux storage with joinedUser
    this.props.dispatch(joinBoop(boopId, userId));
    console.log('markers', this.props.markers);
    this.setState({boopId: boopId});
  }

  leave(boopId, userId) {
    // update redux storage to remove user who is leaving
    this.props.dispatch(leaveBoop(boopId, userId));
    // update db
    this.setState({boopId: boopId});
  }

  getCoordinates() {
    Coords = {
      latitude: this.centerMarker.getPosition().lat(), 
      longitude: this.centerMarker.getPosition().lng()
    }; 
  }

  render() {
    console.log('maps is rendering');
    if (this.state.boopId !== 0) {
      Utils.updateJoinedUsers(this.state.boopId, this.props.markers[this.state.boopId], function() {
        console.log('database updated');
      });
    }
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


