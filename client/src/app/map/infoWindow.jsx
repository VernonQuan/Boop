import React from 'react';
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
  }


  render() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
    <Card style={cardStyle}>
        <CardHeader
          title = {this.props.boop.name}
          avatar = "http://www.19130fitness.com/wp-content/uploads/2015/07/crossfit-barbell.png"
          subtitle = {"Owner: Test Frequency: " + this.props.boop.frequency}/>
        <CardActions>
          <FlatButton
            label= 'Join'
            style= {notCheckedStyle}/>
        </CardActions> 
      </Card>
      </MuiThemeProvider>
  );
  }
};

export default InfoWindow;