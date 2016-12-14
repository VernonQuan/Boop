const users = (state = {user: {}}, action) => {
  switch (action.type) {
    case 'LOG_USER':
      return {
        user: action.user
      }

    default:
      return state
  }
}

export default users