import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import {deepOrange500} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';


const notCheckedStyle = {
  color: 'white', //TODO: not working colors... 
  rippleColor: 'green', 
  backgroundColor:'green',
};

const checkedStyle = {
  color: 'white',
  backgroundColor:'blue',
};

const statsStyle = {
  color: 'white',
  backgroundColor:'red',
};

const cardStyle = {
  'margin': '10px'
};


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class InfoWindow extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      joinedUsersLength: 0,
      internalJoined: false,
    }
  }

  componentWillMount() {
    this.setState({joinedUsersLength: this.props.boop.joinedUsers.length});
    this.setState({internalJoined: this.props.joined});
  }
  
  join() {
    // emit socket event join to notify owner of boop that a user has joined their event
    this.socket.emit('join', this.props.boop.name, this.props.user.username);
    // optimistic update to internal infowindow state
    this.setState({internalJoined: true});
    this.setState({joinedUsersLength: this.state.joinedUsersLength + 1});
    // invoke function from map to send dispatch to redux storage
    this.props.join(this.props.boop.refId, this.props.user._id);
  }

  leave() {
    // optimistic update to internal infowindow state
    this.setState({internalJoined: false});
    this.setState({joinedUsersLength: this.state.joinedUsersLength - 1});
    // invoke function from map to send dispatch to redux storage
    this.props.leave(this.props.boop.refId, this.props.user._id);
  }

  render() {
    // only renders a join button if the boop is for more than one person, the boop has less than the limit in joinedUsers, and joinedUsers does not contain the user
    const Join = this.props.boop.limit > 1 && this.state.joinedUsersLength < this.props.boop.limit && !this.state.internalJoined ? <FlatButton
      label= 'Join'
      style= {notCheckedStyle}
      onTouchTap={() => this.join()}/> : null;
    // only renders a leave button if the user has joined the event and if the user looking at the boop is not the owner
    const Leave = this.state.internalJoined && this.props.owner !== this.props.user._id ? <FlatButton
      label= 'Leave'
      style= {checkedStyle}
      onTouchTap={() => this.leave()}/> : null;
      console.log('rendering infowindow');
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
    <Card style={cardStyle}>
        <CardHeader
          title = {this.props.boop.name}
          avatar = "http://www.19130fitness.com/wp-content/uploads/2015/07/crossfit-barbell.png"/>
          subtitle = {'Owner: Test'}
        <CardText>
          {this.props.boop.frequency} <br/>
          {this.state.joinedUsersLength}/{this.props.boop.limit} users joined
        </CardText>
        <CardActions style={{'textAlign': 'center'}}>
          { Join } { Leave }
        </CardActions> 
      </Card>
      </MuiThemeProvider>
  );
  }
};

export default InfoWindow;