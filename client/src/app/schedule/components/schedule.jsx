import React from 'react';
import { connect } from 'react-redux';
import { addMarker } from '../../actions/index.js';
import DropDownList from './dropdown.jsx';
import CommitButton from './commitButton.jsx';
import StartDate from './startDate.jsx';
import SelectDays from './selectDays.jsx';
import BoopNameInput from './boopNameInput.jsx';
import SelectTime from './selectTime.jsx';
import SelectFrequency from './selectFrequency.jsx';
import UserAmount from './userQuantity.jsx';
import Divider from 'material-ui/Divider';
import * as Utils from '../../utils/utils.js';
import {Coords} from '../../map/map.jsx';
import ScheduleGrid from './categoryGrid.jsx';
import Subheader from 'material-ui/Subheader';


class ScheduleContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      coords:{
        latitude: Coords.latitude,
        longitude:Coords.longitude
      },
      // frequency:'',
      weekdays: [false, false, false, false, false, false, false],
      //[Su,M,T,w,Th,F,Sa]
      startDate: null,
      startTime:null,
      checkIns:[],
      limit: 1,
      categories: [false, false, false, false, false],
      category: '',
      img: ''
    };
    
    
    this.onNameInput = this.onNameInput.bind(this);
    this.onStartDateSet = this.onStartDateSet.bind(this);
    this.onSelectTime = this.onSelectTime.bind(this);
    this.onUserSelect = this.onUserSelect.bind(this);
    this.onScheduleBoop = this.onScheduleBoop.bind(this);
    // this.onFrequencyChange = this.onFrequencyChange.bind(this);
    // this.onDropDownSelect = this.onDropDownSelect.bind(this);

    this.onCategorySelect = {
      onSelectDrinks: this.onSelectDrinks.bind(this),
      onSelectFood: this.onSelectFood.bind(this),
      onSelectGym: this.onSelectGym.bind(this),
      onSelectOutdoors: this.onSelectOutdoors.bind(this),
      onSelectSports: this.onSelectSports.bind(this),
    };

    this.onSelectDays = {
      onSelectDaysInputSunday: this.onSelectDaysInputSunday.bind(this),
      onSelectDaysInputMonday: this.onSelectDaysInputMonday.bind(this),
      onSelectDaysInputTuesday: this.onSelectDaysInputTuesday.bind(this),
      onSelectDaysInputWednesday: this.onSelectDaysInputWednesday.bind(this),
      onSelectDaysInputThursday: this.onSelectDaysInputThursday.bind(this),
      onSelectDaysInputFriday: this.onSelectDaysInputFriday.bind(this),
      onSelectDaysInputSaturday: this.onSelectDaysInputSaturday.bind(this),
    };
  }

  onCategorySelect(category) {
    this.setState({
      category: category.target.value
    });
  }

  onNameInput(nameInput) {
    this.setState({
      name: nameInput.target.value
    });
  }

  onUserSelect(amountInput) {
    this.setState({
      limit: amountInput
    })
  }

// Need to reformat date object to not include current time before passing into database
  onStartDateSet(event, date) {
    this.setState({
      startDate: date
    });
    console.log(this.state);
  }


// Need to reformat time object to not include current date before passing into database
  onSelectTime(event, time) {
    // this.setState({
    //   startTime:time
    // });
    // console.log(this.state);
  }

  onScheduleBoop() {
    var context = this;
    var boopState = this.state;
    boopState.ownerId = this.props.user._id;

    // Sends new boop to database and stores the boop in redux storage
    Utils.postBoop(boopState, function() {
      console.log('posted!');
      context.props.dispatch(addMarker(boopState));
    });
  }

  // onDropDownSelect(event, index, value) {
  //   this.setState({
  //     dropdownValue: value
  //   });
  //   console.log(this.state.dropdownValue)
  // }


// this function was meant to take in the day index and the checked boolean, however 'this' being bound in the SelectDays module is causing issues with accessing this.state.
//////////////////////////////////////////////////
    // onSelectDaysInput(day, event, checked) {

      // var currentState = this.state;
      // currentState.weekdays[day] = checked;
      // console.log(day, checked);
      // this.setState(currentState);
      // this.setState({
      //   startDate[day] = checked
      // })
      // ;
    // }
    // // time to write some UGLY MFIN CODE.
//////////////////////////////////////////////////

onSelectDrinks(event, checked) {
  // var currentState = this.state;
  // currentState.categories[0] = checked;
  if (checked) {
    this.setState({
      category: 'Drinks',
      img: 'https://static1.squarespace.com/static/51e6e1c8e4b018cade39dd2d/t/5239c299e4b0dd764d7743f7/1379517082863/bar-services-hero.jpg'
    });
  }
}

onSelectFood(event, checked) {
  // var currentState = this.state;
  // currentState.categories[1] = checked;
  if (checked) {
    this.setState({
      category: 'Food',
      img: 'https://usercontent2.hubstatic.com/12089443_f496.jpg'
    });
  }
}

onSelectGym(event, checked) {
  // var currentState = this.state;
  // currentState.categories[2] = checked;
  if (checked) {
    this.setState({
      category: 'Gym',
      img: 'http://www.kaylainthecity.com/wp-content/uploads/gym.jpg'
    });
  }
}

onSelectOutdoors(event, checked) {
  // var currentState = this.state;
  // currentState.categories[3] = checked;
  if (checked) {
    this.setState({
      category: 'Outdoors',
      img: 'http://az616578.vo.msecnd.net/files/2015/06/08/635693880042525992-518822648_couple-hiking-valley.jpg'
    });
  }
}

onSelectSports(event, checked) {
  // var currentState = this.state;
  // currentState.categories[4] = checked;
  if (checked) {
    this.setState({
      category: 'Sports',
      img: 'https://s-media-cache-ak0.pinimg.com/originals/94/91/be/9491be93bd39554e24def0ec1530b68f.jpg'
    });
  }
}

// DONT JUDGE ME, IM PRESSED FOR TIME D;
//////////////////////////////////////////////////
onSelectDaysInputSunday(event, checked) {
  var currentState = this.state;
  currentState.weekdays[0] = checked;
  this.setState(currentState);
}

onSelectDaysInputMonday(event, checked) {
  var currentState = this.state;
  currentState.weekdays[1] = checked;
  this.setState(currentState)
}

onSelectDaysInputTuesday(event, checked) {
  var currentState = this.state;
  currentState.weekdays[2] = checked;
  this.setState(currentState);
}

onSelectDaysInputWednesday(event, checked) {
  var currentState = this.state;
  currentState.weekdays[3] = checked;
  this.setState(currentState)
}

onSelectDaysInputThursday(event, checked) {
  var currentState = this.state;
  currentState.weekdays[4] = checked;
  this.setState(currentState)
}

onSelectDaysInputFriday(event, checked) {
  var currentState = this.state;
  currentState.weekdays[5] = checked;
  this.setState(currentState)
}

onSelectDaysInputSaturday(event, checked) {
  var currentState = this.state;
  currentState.weekdays[6] = checked;
  this.setState(currentState)
}
//////////////////////////////////////////////////


  render() {
    return (
      <div>
        <div>
          <Subheader>Pick One Boop Category</Subheader>
        </div>
        <div>
          <ScheduleGrid 
            onCategorySelect={this.onCategorySelect}
            category={this.state.category}
          />
        </div>
        <div>
          <BoopNameInput
            onNameInput={this.onNameInput}
            name={this.state.name}
            />
        </div>
        <div>
          <StartDate
            onStartDateSet={this.onStartDateSet}
            startDate={this.state.startDate}/>
        </div>
        <div>
        <SelectTime
            onSelectTime={this.onSelectTime}/>
        </div>
        <div>
          <UserAmount onUserSelect={this.onUserSelect}/>
        </div>
        <br/>
        <Divider />
        <br/>
        <div>
        <SelectDays
            onSelectDays={this.onSelectDays}
            weekdays={this.state.weekdays}/>
        </div>
        <div>
          <CommitButton
            currentState = {this.state}
            onScheduleBoop = {this.onScheduleBoop}/>
        </div>
      </div>
    );
  }
}


 const mapStateToProps = (state) => ({
   user: state.users.user
 })

ScheduleContainer = connect(mapStateToProps)(ScheduleContainer);

export default ScheduleContainer;
