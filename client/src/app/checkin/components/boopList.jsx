import React from 'react';
import Boop from './boop.jsx';
import {Profile} from './profile.jsx';

const BoopList = (props) => {
  return (<div className='boopList'>
  {
    Object.keys(props.boops).map((key) =>
      (<Boop index={key} boop={props.boops[key]} handleCheckinBoop={props.handleCheckinBoop}/>))
  }
  <Profile/>
  </div>);
}

BoopList.propTypes = {
  boops: React.PropTypes.array.isRequired,
  handleCheckinBoop: React.PropTypes.func.isRequired
};

export default BoopList;


