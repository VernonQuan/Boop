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
    console.log('passed userId in reducer', action.userId);
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
    default: 
      return state;
  }
}

export default markers;