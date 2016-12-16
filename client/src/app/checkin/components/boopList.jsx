import React from 'react';
import Boop from './boop.jsx';

const BoopList = (props) => {
  return (<div className='boopList'>
  {
    Object.keys(props.boops).map((key) =>
      (<Boop index={key} boop={props.boops[key]} handleCheckinBoop={props.handleCheckinBoop}/>))
  }
  </div>);
}

BoopList.propTypes = {
  boops: React.PropTypes.object.isRequired,
  handleCheckinBoop: React.PropTypes.func.isRequired
};

export default BoopList;


