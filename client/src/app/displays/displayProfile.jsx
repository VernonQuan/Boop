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
  chip: { margin: 4 },
  wrapper: { display: 'flex', flexWrap: 'wrap' }
};

class displayProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardList : [{rank:3,username: 'blake',favoriteActivity:'basketball',origin:'Houston'}],
      currentUser: [{rank:3,username: 'blake',favoriteActivity:'basketball',origin:'Houston'}]

    }
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

  componentWillMount(){
    var context = this;
    // grabs all of the users in the db
    axios.get('/api/users')
    .then(function (response) {
    // grabs the top 10 users by rank
    //to display on the leaderboard
      var list = response.data;
      console.log(list)
      list = list.sort(function(a, b){
        return a.rank > b.rank;
      }).reverse().slice(0,10);
      context.setState({
        leaderboardList : list
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    // grabs the updated logged in user
    axios.get('/user:' + context.props.user.email)
    .then(function (response) {
      var user = response.data;
      context.setState({
        currentUser: user[0]
      });
    });
  }

  render(){

    return(<div><Table style={{width: '100%'}}>
    <TableHeader displaySelectAll= {false} adjustForCheckbox = {false} >
      <TableRow>
        <TableHeaderColumn>Rank</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox = {false} >
      <TableRow>
        <TableRowColumn><Chip style={styles}>

          <Avatar src={this.determinePicture(this.props.user.rank)} />
        {this.state.currentUser.rank}</Chip></TableRowColumn>
        <TableRowColumn><Chip style={styles}>
          <Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/rogie/48.jpg" />
        {this.state.currentUser.username}</Chip>
        </TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
  <h3 style={h3Style}>LeaderBoard</h3>
  <Table style={{width: '100%'}}>
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