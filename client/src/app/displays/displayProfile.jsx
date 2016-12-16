import React from 'react';
import { connect } from 'react-redux';
import Login from '../login/login.jsx';
import {Leaderboard} from './leaderboard.jsx';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import * as Utils from '../utils/utils.js';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const h3Style = {
  textAlign: 'center'
};
const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

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
    list = list.reverse();
    context.setState({

      leaderboardList : list
    })


  })
  .catch(function (error) {
    console.log(error);
  });

    }

  render(){

    return(<div><Table style={{width: '85%'}}>
    <TableHeader displaySelectAll= {false} adjustForCheckbox = {false} >
      <TableRow>
        <TableHeaderColumn>Rank</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox = {false} >
      <TableRow>
        <TableRowColumn><Chip style={styles}>
          <Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/rogie/48.jpg" />
        {this.props.user.rank}</Chip>
        </TableRowColumn>
        <TableRowColumn><Chip style={styles}>
          <Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/rogie/48.jpg" />
        {this.props.user.username}</Chip>
        </TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
  <h3 style={h3Style}>LeaderBoard</h3>
  <Table style={{width: '85%'}}>
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