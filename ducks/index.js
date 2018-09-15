import { combineReducers } from 'redux'
import session, { INITIAL_STATE as SESSION_INITIAL_STATE } from './session'

export default combineReducers({
  session,
})

export const INITIAL_STATE = {
  session: SESSION_INITIAL_STATE,
}
