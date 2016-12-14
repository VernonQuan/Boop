const markers = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return {
        ...state,
        [action.newMarker._id]: action.newMarker,
      };
    default: 
      return state;
  }
}

export default markers;