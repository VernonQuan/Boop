import React from 'react';
import { connect } from 'react-redux';
import Login from '../login/login.jsx';
import {Leaderboard} from './leaderboard.jsx';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import * as Utils from '../utils/utils.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class displayProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardList : [{rank:3,username: 'blake',favoriteActivity:'basketball',origin:'Houston'}]

    }
  };
  componentWillMount(){
    var context = this;
    axios.get('/api/users')
  .then(function (response) {

    var list = response.data;
    list = list.sort(function(a, b){
      return a.rank > b.rank;
    }).slice(0,10);
    context.setState({

      leaderboardList : list
    })


  })
  .catch(function (error) {
    console.log(error);
  });

    }

  render(){

    return(<div><Table>
    <TableHeader displaySelectAll= {false} adjustForCheckbox = {false}>
      <TableRow>
        <TableHeaderColumn>Rank</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox = {false} >
      <TableRow>
        <TableRowColumn>{this.props.user.rank}</TableRowColumn>
        <TableRowColumn>{this.props.user.username}</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
  LeaderBoard:
<Table >
    <TableHeader displaySelectAll= {false} adjustForCheckbox = {false}>
      <TableRow>
        <TableHeaderColumn>Rank</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox = {false}>
    {this.state.leaderboardList.map((uniq) => <Leaderboard userz={uniq} />)}
    </TableBody>
  </Table>
  </div>)
  }
}


 const mapStateToProps = (state) => ({
   user: state.users.user
 })

 displayProfile = connect(mapStateToProps)(displayProfile);

export default displayProfile