import React, {Component} from 'react';
import { connect } from 'react-redux';
import { logUser } from '../actions/index.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import * as loginCtrl from './loginCtrl';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      email: '',
      password: '',
      favoriteActivity: '',
      placeOfOrigin: '',
      loginIsOpen: true,
      isSigningUp: false,
      submitError: ''
    };
  };

  handleLogin = () => {
    var context = this;
    var returningUser = {
      email: this.state.email,
      password: this.state.password
    };
    loginCtrl.login(returningUser)
    .then(function(res) {
      context.setState({
        loginIsOpen: false
      })
      context.props.main.setState({
        isLoggedIn: true
      });
      // plugs in email and password in an object into dispatch
      context.props.dispatch(logUser(res.data.userData));
    })
  };

  handleSignUp = () => {
    var newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      origin: this.state.placeOfOrigin,
      favoriteActivity: this.state.favoriteActivity
    };
    loginCtrl.signup(newUser)
    .then(res => {
      this.setState({
        loginIsOpen: false
      });
      this.props.main.setState({
        isLoggedIn: true
      });

    })
    .catch(err => {
      const msg = err.response.data.message;
      this.setState({
        submitError: msg
      });
    })
  };

  handleChange = (name,e) => {
    if (this.state.submitError) {
      this.setState({ submitError: '' });
    }
    this.setState({
      [name]: e.target.value
    });
  };

  toggleSignUp = () => {
    this.setState({
      isSigningUp: !this.state.isSigningUp
    });
  };

  render() {
    const signUp = this.state.isSigningUp;
    const origin = signUp ?
      (<TextField
        onChange={this.handleChange.bind(this,'placeOfOrigin')}
        fullWidth={true}
        hintText='Where you from?' />
        ) :
      null;
    const favoriteActivity = signUp ?
      (<TextField
        onChange={this.handleChange.bind(this,'favoriteActivity')}
        fullWidth={true}
        hintText='favorite activity' />
        ) :
      null;
    const signUpField = signUp ?
      (<TextField
        onChange={this.handleChange.bind(this,'username')}
        fullWidth={true}
        hintText='username' />
        ) :
      null;

    const standardActions = [
      <RaisedButton
        label='Login'
        primary={!this.state.isSigningUp}
        onTouchTap={(!signUp) ?
          this.handleLogin :
          this.toggleSignUp.bind(this)
        }
      />,
      <RaisedButton
        label='Signup'
        primary={this.state.isSigningUp}
        onTouchTap={(signUp) ?
          this.handleSignUp :
          this.toggleSignUp.bind(this)
        }
      />
    ];

    return (
          <Dialog
            autoDetectWindowHeight={false}
            overlayClassName='hidden'
            open={this.state.loginIsOpen}
            title='Welcome!'
            actions={standardActions}
            modal={true}
          >
            <TextField
              onChange={this.handleChange.bind(this,'email')}
              fullWidth={true}
              hintText='email' />
            {favoriteActivity}
            {origin}
            {signUpField}
            <TextField
              onChange={this.handleChange.bind(this,'password')}
              fullWidth={true}
              hintText='password'
              type='password'
              errorText={this.state.submitError}
             />
          </Dialog>
    );
  }
}

Login = connect()(Login);

export default Login;
