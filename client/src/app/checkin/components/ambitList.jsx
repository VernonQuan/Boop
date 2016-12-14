import React from 'react';
import Ambit from './ambit.jsx';
import {Profile} from './profile.jsx';

const AmbitList = (props) => {
  return (<div className='ambitList'>
  {
    Object.keys(props.ambits).map((key) =>
      (<Ambit index={key} ambit={props.ambits[key]} handleCheckinAmbit={props.handleCheckinAmbit}/>))
  }
  <Profile/>
  </div>);
}

AmbitList.propTypes = {
  ambits: React.PropTypes.array.isRequired,
  handleCheckinAmbit: React.PropTypes.func.isRequired
};

export default AmbitList;


