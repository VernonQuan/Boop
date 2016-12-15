import FlatButton from 'material-ui/FlatButton';

//mid page
const style = {
  color: 'white',
  backgroundColor:'orange',
};

export default const Controls = (props) => {
  return (<div>
   <FlatButton onTouchTap={props.handleCreateBoop}>Create Boop</FlatButton>
    </div>);
};  