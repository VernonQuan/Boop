import { combineReducers } from 'redux';
import markers from './markers.js';
// UNCOMMENT BELOW WHEN USERS IS UPDATED
// import users from './users.js'; 

const boopApp = combineReducers({
  markers,
});

export default boopApp;
