export const addMarker = (newMarker) => {
  return {
    type: 'ADD_MARKER',
    newMarker
  }
}

export const joinBoop = (boopId, userId) => {
  return {
    type: 'JOIN_BOOP',
    boopId, 
    userId,
  }
}

export const logUser = (user) => {
  return {
    type: 'LOG_USER',
    user
  }
}

