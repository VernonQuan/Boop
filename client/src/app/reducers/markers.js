var Immutable = require('immutable');

const markers = (state = {}, action) => {
  switch (action.type) {
    // adds either a full array of boops, replacing the entire current state or appends individual boops to the state
    case 'ADD_MARKER':
      if (Array.isArray(action.newMarker)) {
        var allMarkers = {};
        action.newMarker.map((marker) => (
          allMarkers[marker.refId] = marker
        ));
        return allMarkers;
      } else {
        return {
          ...state,
          [action.newMarker.refId]: action.newMarker,
        };
      }
    // appends the userId to the joinedUsers of the boop
    case 'JOIN_BOOP':
      return {
        ...state, 
        [action.boopId]: {
          ...state[action.boopId],
          joinedUsers: [
            ...state[action.boopId].joinedUsers,
            action.userId
          ]
        }
      }
    // removes the userId from the joinedUsers array
    case 'LEAVE_BOOP':
      var removedUserArr = state[action.boopId].joinedUsers.filter(value => (value !== action.userId));
      return {
        ...state, 
        [action.boopId]: {
          ...state[action.boopId],
          joinedUsers: removedUserArr
        }
      }
    default: 
      return state;
  }
}

export default markers;