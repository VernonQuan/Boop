import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RemoveCircle from 'material-ui/svg-icons/content/remove';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginRight: 20,
};

class UserAmount extends React.Component {
  constructor (props) {
    super(props);

    this.state = {value: 1};
  }

  increment() {
    this.setState ({
      value: ++this.state.value
    });
  }

  decrement() {
    if (this.state.value > 1) {
      this.setState ({
        value: --this.state.value
      });
    }
  }

  render() {
    return (
      <div>
        <TextField value={this.state.value}/>
        <FloatingActionButton 
          style={style} mini={true} onClick={() => this.decrement()}>
          <RemoveCircle />
        </FloatingActionButton>
        <FloatingActionButton 
          style={style} mini={true} onClick={() => this.increment()}>
          <ContentAdd/>
        </FloatingActionButton>
      </div>
    );
  }
}



export default UserAmount;