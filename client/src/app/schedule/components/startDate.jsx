import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const StartDate = (props) => (
  <div>
    <DatePicker
    hintText="Select Boop Start Date"
    value = {props.startDate}
    onChange= {props.onStartDateSet}
    autoOk= {true}
    locale="en-US"
    firstDayOfWeek={0}
    />
  </div>
);


export default StartDate;