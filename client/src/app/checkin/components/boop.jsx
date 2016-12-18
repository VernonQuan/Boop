import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {Link} from 'react-router';

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
  backgroundColor:'blue',
};

const removeStyle = {
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

class Boop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Card style={cardStyle}>
        <CardHeader
          title = {this.props.boop.name}
          avatar = "https://s3-us-west-1.amazonaws.com/boops/entertainment.jpg"
          subtitle = {this.props.boop.frequency}
        />
        <CardActions>
          <FlatButton
            label= {
              this.props.boop.checkedIn ? "Checked In":"Check In!"
            }
            onTouchTap={() => { 
              this.props.handleCheckinBoop(this.props.boop); 
              } 
            }
            disabled = {this.props.boop.checkedIn}
            style={this.props.boop.checkedIn ? checkedStyle : notCheckedStyle}/>
          <FlatButton
            label={<Link to={'/display/' + this.props.index} style={linkStyle}>Stats</Link>}//send to the stats page of the boop.
            style={statsStyle}/>
          <FlatButton label={'Remove'} style={removeStyle} onTouchTap={() => this.props.handleRemoveBoop(this.props.boop)}/>
        </CardActions> 
      </Card>
    );
  }
};


Boop.propTypes = {
  boop: React.PropTypes.object.isRequired,
  handleCheckinBoop: React.PropTypes.func.isRequired
};

export default Boop;










