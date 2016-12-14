import React from 'react';
import { connect } from 'react-redux';
import Login from '../../login/login.jsx';


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


    return(<div>
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
            {console.log(this.props)}
            <td>{this.props.username}</td>
            <td>Elite</td>
            <td>Basketball</td>
            <td>H-Town</td>
          </tr>
        </tbody>
      </table>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  username: state.users.username,
})

Profile = connect(mapStateToProps)(Profile);

export {Profile}