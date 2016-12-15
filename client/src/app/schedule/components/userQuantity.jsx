import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RemoveCircle from 'material-ui/svg-icons/content/remove';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginRight: 20,
};

const style2 = {
  margin: 12,
};

class UserAmount extends React.Component {
  constructor (props) {
    super(props);

    this.state = {value: 1};
  };

  onClick = () => {
    this.increment();
  }

  increment = () => {
    this.state.value++;
  }

  decrement = () => {
    this.state.value--;
  }

  render() {
    return (
      <div>
        <TextField hintText='Number of Participants' value={this.state.value}/>
        <FloatingActionButton style={style} mini={true}>
          <RemoveCircle />
        </FloatingActionButton>
        <FloatingActionButton style={style} mini={true}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}



export default UserAmount;