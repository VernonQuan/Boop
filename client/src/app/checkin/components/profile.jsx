import React from 'react';
import { connect } from 'react-redux';
import Login from '../../login/login.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  };

  render(){
     return (
      <Table>
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
            <TableRowColumn>{this.props.user.rank}</TableRowColumn>
            <TableRowColumn>{this.props.user.username}</TableRowColumn>
            <TableRowColumn>{this.props.user.favoriteActivity}</TableRowColumn>
            <TableRowColumn>{this.props.user.origin}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>)
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user
})

Profile = connect(mapStateToProps)(Profile);

export {Profile}