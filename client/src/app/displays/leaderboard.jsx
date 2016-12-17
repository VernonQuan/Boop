import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  };

   determinePicture(rank) {
    var url = ''
    if (rank < 4) {
      url = 'http://i.imgur.com/ciDDBOz.png';
    } else if (rank < 8) {
      url = 'http://i.imgur.com/Zs7l8AD.png';
    } else if (rank < 12) {
      url = 'http://i.imgur.com/t9YI38e.png';
    } else if (rank < 16) {
      url = 'http://i.imgur.com/nvkleuQ.png';
    } else if (rank < 20) {
      url = 'http://i.imgur.com/NO29rvV.png';
    } else if (rank < 24) {
      url = 'http://i.imgur.com/XLicDQr.png';
    } else if (rank < 28) {
      url = 'http://i.imgur.com/8OTPb7g.png';
    } else if (rank < 32) {
      url = 'http://i.imgur.com/RAn6owu.png';
    } else if (rank < 36) {
      url = 'http://i.imgur.com/weaQxmK.png';
    } else {
      url = 'http://i.imgur.com/xwSRDv4.png';
    }
    return url;
  }

  render() {
    return(
      <TableRow>
 
        <TableRowColumn><Chip style={styles}>
            <Avatar src={this.determinePicture(this.props.userz.rank)} />
          {this.props.userz.rank}</Chip></TableRowColumn>
        <TableRowColumn><Chip style={styles}>
            <Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/rogie/48.jpg" />
          {this.props.userz.username}</Chip></TableRowColumn>
      </TableRow>
    )
  }
}

export {Leaderboard}