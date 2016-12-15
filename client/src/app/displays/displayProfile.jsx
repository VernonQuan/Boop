import React from 'react';
import { connect } from 'react-redux';
import Login from '../login/login.jsx';

import {List, ListItem} from 'material-ui/List';
import * as Utils from '../utils/utils.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class displayProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  render(){
    return(<Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Rank</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Favorite Activity</TableHeaderColumn>
        <TableHeaderColumn>Place of Origin</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableRowColumn>Elite</TableRowColumn>
        <TableRowColumn>Blake Fleck</TableRowColumn>
        <TableRowColumn>BasketBall</TableRowColumn>
        <TableRowColumn>Houston</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>)
  }
}


// const mapStateToProps = (state) => ({
//   username: state.users.username,
// })

// Profile = connect(mapStateToProps)(Profile);

// export {Profile}