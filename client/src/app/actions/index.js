export const addMarker = (newMarker) => {
  return {
    type: 'ADD_MARKER',
    newMarker
  }
}

export const logUser = (user) => {
  return {
    type: 'LOG_USER',
    user
  }
}