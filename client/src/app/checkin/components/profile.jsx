import React from 'react';
import { connect } from 'react-redux';
import Login from '../../login/login.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';




class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={

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

const mapStateToProps = (state) => ({
  username: state.users.username,
})

Profile = connect(mapStateToProps)(Profile);

export {Profile}