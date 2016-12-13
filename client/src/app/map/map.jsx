import React, {Component} from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

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
    console.log('called initMap');
    var context = this;
    var hackReactor = { lat: 37.791066, lng: -122.3991683 }
    var uluru = {lat: -25.363, lng: 131.044};
    // Acquires current location of user
    navigator.geolocation.getCurrentPosition(function(position) {

      var latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var map = new googleMaps.Map(document.getElementById('map'), {
        zoom: 17,
        center: latlng,
      });

      var marker = new googleMaps.Marker({
        position: latlng,
        map: map,
      });
      
      // Awful, impure pattern, fix:
      context.mapInstance = map;
      context.centerMarker = marker;
      context.googleMaps = googleMaps;

      googleMaps.event.addListener(context.mapInstance, 'drag', () => {
        var centerLatLng = map.getCenter();
        context.centerMarker.setPosition(centerLatLng);
        console.log('moving to ', centerLatLng);
      });
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
      </div>
    )
  }
}

export { Coords }; //there is single-entry point to schedule and it is through maps.
export default Map;


