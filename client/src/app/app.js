import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import boopApp from './reducers/index.js';

import Main from './Main'; // Our custom react components
import Map from './map/map.jsx';
import Schedule from './schedule/components/schedule.jsx'
import CheckinContainer from './checkin/components/checkinContainer.jsx';
// import DisplayAmbit from './displayAmbit/displayAmbit.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

import ambitDisplay from './displays/displayAmbit.jsx';
import profileDisplay from './displays/displayProfile.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let store = createStore(boopApp);

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={Main}>
            <Route path='/' component={CheckinContainer}/>
            <Route path='/schedule' component={Schedule}/>
            <Route path='/map' component={Map}/>
            <Route path='/displayAmbit' component={ambitDisplay}/>
            <Route path='/displayProfile' component={profileDisplay}/>
            <Route path='/display/:ambitNum' component={Display}/>
          </Route>
        </Router>
      </Provider> 
    )
  }
}

render(<App />, document.getElementById('app'));