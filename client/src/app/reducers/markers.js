const markers = (state = {}, action) => {
  switch (action.type) {
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
    default: 
      return state;
  }
}

export default markers;