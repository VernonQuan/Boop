/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Login from './login/login.jsx';
import * as loginCtrl from './login/loginCtrl';
import { Link } from 'react-router'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const styles = {
  container: { textAlign: 'center', paddingTop: 200
  }
};

const muiTheme = getMuiTheme({
  palette: { accent1Color: deepOrange500 }
});

const linkStyle = {
  color:'white',
  'text-decoration':'none'
};

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.socket = io();

    this.state = {
      isLoggedIn: !!loginCtrl.getJwt(),
      open: false,
      feedback: {
        open: false,
        autoHideDuration: 2000,
        message: '',
      }
    };
  }

  componentDidMount() {
    var context = this;
    this.socket.on('join', function(boop, user) {
      context.setState({feedback: {...context.state.feedback, open: true, message: user + ' joined ' + boop }});
      window.setTimeout(() => context.setState({feedback: {...context.state.feedback, open: false}}), 2000);
    });
  }

  handleLogout() {
    browserHistory.push('/');
    loginCtrl.logout();
    this.setState({
      isLoggedIn: false
    });
  }

  handleDrawerToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    // sets all variables for the user login fields
    // or signup fields based on current state
    const logOutButton = this.state.isLoggedIn ?
      (  <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem primaryText="Drinks" />
          <MenuItem primaryText="Food" />
          <MenuItem primaryText="Gym" />
          <MenuItem primaryText="Outdoors" />
          <MenuItem primaryText="Sports" />
          <MenuItem onTouchTap={this.handleLogout.bind(this)} primaryText="Sign out" />
        </IconMenu>
      ) :
      (<FlatButton label="Login"
       />
      );
    const LoginModal = !this.state.isLoggedIn ?
      (<Login main={this} />) :
      null;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title='Boop!'
            onLeftIconButtonTouchTap={this.handleDrawerToggle}
            iconElementRight={logOutButton}/>
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}>
            <Link to="/" onClick={this.handleDrawerToggle} style={linkStyle}>
              <MenuItem>Main Page</MenuItem>
            </Link>
            <Link to="/displayProfile" onClick={this.handleDrawerToggle} style={linkStyle}>
            <MenuItem>Profile</MenuItem>
            </Link>
          </Drawer>
          {LoginModal}
          {this.props.children}

          <Snackbar
          open={this.state.feedback.open}
          message={this.state.feedback.message}
          autoHideDuration={this.state.feedback.autoHideDuration}/>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
