const users = (state = {username: ''}, action) => {
  switch (action.type) {
    case 'LOG_USER':
      return {
        username: action.user
      }

    default:
      return state
  }
}

export default users