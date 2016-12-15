import React from 'react';
import TimePicker from 'material-ui/TimePicker';

const SelectTime = (props) => (
  <div>
    <TimePicker
      hintText="Select Boop Time"
      autoOk={true}
      onChange= {props.onSelectTime}
    />
  </div>
);

export default SelectTime;