// Initial State
export const INITIAL_STATE = {
  user: null,
}

// Actions
const LOGIN_USER = 'summoners/session/LOGIN_USER'

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
      }

    default:
      return state
  }
}

// Action creators
export function loginUser(user) {
  return { type: LOGIN_USER, user }
}
