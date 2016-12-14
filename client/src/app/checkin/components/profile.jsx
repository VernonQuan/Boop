import React from 'react';
import { connect } from 'react-redux';
import Login from '../../login/login.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';




class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state ={

    }
    const divStyle = {
    color: 'blue',
    }
  };

  render(){
    return(
      <div>
      <table>
        <thead>
          <tr>
           <th>Name</th>
           <th>Rank</th>
           <th>Interests</th>
           <th>Place of Origin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          {console.log(this.props.user)}
            <td>{this.props.user.username}</td>
            <td>{this.props.user.rank}</td>
            <td>{this.props.user.favoriteActivity}</td>
            <td>{this.props.user.origin}</td>
          </tr>
        </tbody>
      </table>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user
})

Profile = connect(mapStateToProps)(Profile);

export {Profile}