const markers = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      if (Array.isArray(action.newMarker)) {
        var allMarkers = {};
        action.newMarker.map((marker) => (
          allMarkers[marker._id] = marker
        ));
        return allMarkers;
      } else {
        return {
          ...state,
          [action.newMarker._id]: action.newMarker,
        };
      }
    default: 
      return state;
  }
}

export default markers;