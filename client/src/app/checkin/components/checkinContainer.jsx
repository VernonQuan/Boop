import React from 'react';
import { connect } from 'react-redux';
import { addMarker } from '../../actions/index.js';
import * as Utils from '../../utils/utils.js';
import BoopList from './boopList.jsx';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import {Router, Route, Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import * as checkinCtrl from '../checkinController.js';
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
  checkInternetConnection:'Cannot fetch boops:( Check internet connection'
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
      console.log(context.props.user.rank);
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

  handleShowStats(){}

  render() {
    if(!this.state.loading) {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <BoopList boops={this.props.markers}
            handleCheckinBoop={this.handleCheckinBoop}/>

            <RaisedButton
            // onTouchTap={this.handleCreateBoop}
            buttonStyle={createStyle}
            containerElement={<Link to='/map'/>}
            fullWidth = {true}
            >Create Boop</RaisedButton>


            <Snackbar
            open={this.state.feedback.open}
            message={this.state.feedback.message}
            autoHideDuration={this.state.feedback.autoHideDuration}/>
          </div>
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
