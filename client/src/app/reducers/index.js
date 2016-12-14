import { combineReducers } from 'redux';
import markers from './markers.js';
import users from './users.js'; 

const boopApp = combineReducers({
  markers,
  users
});

export default boopApp;
