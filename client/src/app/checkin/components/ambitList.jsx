import React from 'react';
import Ambit from './ambit.jsx';
import {Profile} from './profile.jsx';

const AmbitList = (props) => {
  return (<div className='ambitList'>
  {
    props.ambits.map((item, index) =>
      (<Ambit index={index} ambit={item} handleCheckinAmbit={props.handleCheckinAmbit}/>))
  }
  <Profile/>
  </div>);
}

AmbitList.propTypes = {
  ambits: React.PropTypes.array.isRequired,
  handleCheckinAmbit: React.PropTypes.func.isRequired
};

export default AmbitList;


