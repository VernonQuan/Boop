import React from 'react';
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
            <td>Blake</td>
            <td>Elite</td>
            <td>Basketball</td>
            <td>H-Town</td>
          </tr>
        </tbody>
      </table>
    </div>)
  }
}
export {Profile}