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

const linkStyle = {
  color:'white',
  'text-decoration':'none'
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
      joined: false,
    }
  }

  componentWillMount() {
    this.setState({joinedUsersLength: this.props.boop.joinedUsers.length});
    this.setState({joined: this.props.joined});
  }
  
  join() {
    // emit socket event join to notify owner of boop that a user has joined their event
    // TEMPORARY FOR TESTING ONLY. WORKING CODE
    //this.socket.emit('join', this.props.boop.name, this.props.user.username);
    this.setState({joinedUsersLength: this.state.joinedUsersLength + 1});
    this.setState({joined: true});
    // invoke function from map to send dispatch to redux storage
    this.props.join(this.props.boop.refId, this.props.user._id);
  }

  render() {
    // only renders a join button if the boop is for more than one person, the boop has less than the limit in joinedUsers, and joinedUsers does not contain the user
    const Join = this.props.boop.limit > 1 && this.state.joinedUsersLength < this.props.boop.limit && !this.props.joined ? <FlatButton
      label= 'Join'
      style= {notCheckedStyle}
      onTouchTap={() => this.join()}/> : null;
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
          { Join }
        </CardActions> 
      </Card>
      </MuiThemeProvider>
  );
  }
};

export default InfoWindow;