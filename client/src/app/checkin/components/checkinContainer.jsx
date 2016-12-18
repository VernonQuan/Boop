import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import SwipeableViews from 'react-swipeable-views';
import { addMarker } from '../../actions/index.js';
import * as Utils from '../../utils/utils.js';
import BoopList from './boopList.jsx';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import {Router, Route, Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import * as checkinCtrl from '../checkinController.js';
import Map from '../../map/map.jsx';
//import Controls from './controls.jsx';


//styling
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const createStyle = {
  color: 'white',
  backgroundColor:'orange',
  'margin-top': '6px'
};


const spinnerStyle  = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const userFeedback = {
  default: '',
  cheat:'Not at the Location',
  geoNotFount: 'Geolocation feature is not enabled',
  successfulCheckin: 'Check in successful',
  checkInternetConnection:'Cannot fetch boops:( Check internet connection',
  successfulDelete:'Deleted Boop'
};

const containerDiv  = {
  height: '100%',
  width: '100%',
};

class CheckinContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boops: [],
      loading: false,
      feedback: {
        open: false,
        autoHideDuration: 3000,
        message: userFeedback.default
      }
    };
    this.handleCheckinBoop = this.handleCheckinBoop.bind(this);
  }

  componentDidMount() {
    var context = this;
    // Collects all boops from the db
    Utils.getAllBoops((data, error) => {
      if(error) {
        //send user feedback: no connection
      } else {
        // Perpetuates db boops to redux storage and in checkinContainer state
        this.setState({boops: data});
        context.props.dispatch(addMarker(data));
      }
    });
  }

  handleCheckinBoop(boop) {
    var context = this;
    this.setState({loading: true}); //loading...
    //validate checkin:
    Utils.checkinBoop(boop, () => {
      //if valid update the state
      this.state.boops.find(item => boop.name === item.name).checkedIn = true;
      checkinCtrl.upRank(context.props.user);
      this.setState({
        loading:false,
        boops: this.state.boops,
        feedback: {open: true, message: userFeedback.successfulCheckin}
      });
      //update the database
      Utils.postCheckin(boop.refId, () => {
        console.log('delivered');
      });
    }, ()=>{
      //you can't cheat message:
      this.setState({loading:false, feedback: { open: true, message:userFeedback.cheat}});
    });
  }

  handleRemoveBoop(boop){
    console.log('handleRemoveBoop', boop);
    this.setState({loading: true}); //loading...
    var context = this;
    Utils.removeBoop(boop.refId, () => {
    // finished removing from the db
      context.setState({
        loading: false,
        feedback: {open: true, message: userFeedback.successfulDelete}
      });
    });
    Utils.getAllBoops((data, error) => {
      if(error) {
        //send user feedback: no connection
      } else {
        // Perpetuates db boops to redux storage and in checkinContainer state
        this.setState({boops: data});
        context.props.dispatch(addMarker(data));
      }
    });
  }

  render() {
    const noBoopMessage = Object.keys(this.props.markers).length === 0 ? <Card>
        <CardHeader
        title = {'No boops here :('}
        subtitle = {'Swipe to the left to add some boops!'}>
        </CardHeader>
      </Card> : null;
    console.log('render checkincontainer');
    if(!this.state.loading) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
        <SwipeableViews onChangeIndex={(index) => {index === 1 ? browserHistory.push('/map') : null}}>
          <div style={containerDiv}>
            <BoopList boops={this.props.markers}
            handleCheckinBoop={this.handleCheckinBoop}
            handleRemoveBoop={(boopId) => this.handleRemoveBoop(boopId)}/>
            { noBoopMessage }
            <Snackbar
            open={this.state.feedback.open}
            message={this.state.feedback.message}
            autoHideDuration={this.state.feedback.autoHideDuration}/>
          </div>
          
          <div></div>

        </SwipeableViews>
        </MuiThemeProvider>
      );
    } else {
      return (
        <div>
          <CircularProgress size={60} thickness={7} style={spinnerStyle}/>
        </div>
        );
    }
  }
};


const mapStateToProps = (state) => ({
  markers : state.markers,
  user: state.users.user
});

CheckinContainer = connect(mapStateToProps)(CheckinContainer);

export default CheckinContainer;

// /<Controls handleCreateBoop={this.handleCreateBoop}/>
