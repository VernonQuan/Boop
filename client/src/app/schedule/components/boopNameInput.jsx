import React from 'react';
import TextField from 'material-ui/TextField';

const BoopNameInput = (props) => (
  <div>
    <TextField
      hintText= "Boop Name"
      // errorText="Please enter an Boop Name"
      onChange={props.onNameInput}
    />
  </div>
);

export default BoopNameInput;