import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
const style = {
  margin: 12,
};

class CommitButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = { open: false };
  };

  onClick = () => {
    this.props.onScheduleBoop();
    this.handleTouchTap();
  }

  handleTouchTap = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
        label="SCHEDULE"
        style={style}
        onTouchTap={this.onClick}
       // create boop using date, name etc from current state
        />
        <Snackbar
          open={this.state.open}
          message='Boop added'
          autoHideDuration={4000}
          onRequestClose={this.props.handleRequestClose}
        />
      </div>
    );
  }
};


export default CommitButton;
