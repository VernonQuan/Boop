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
  }

  componentDidMount() {
    // listen for state changes on socket
    this.socket.on('join', function(boop, user) {
      console.log(user, 'joined', boop);
    });
  }
  
  join() {
    this.socket.emit('join', this.props.boop.name, this.props.user.username);
  }

  render() {
    const Join = this.props.boop.limit > 1 ? <FlatButton
      label= 'Join'
      style= {notCheckedStyle}
      onTouchTap={() => this.join()}/> : null;
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
    <Card style={cardStyle}>
        <CardHeader
          title = {this.props.boop.name}
          avatar = "http://www.19130fitness.com/wp-content/uploads/2015/07/crossfit-barbell.png"
          subtitle = {"Owner: Test Frequency: " + this.props.boop.frequency}/>
        <CardActions>
          { Join }
        </CardActions> 
      </Card>
      </MuiThemeProvider>
  );
  }
};

export default InfoWindow;