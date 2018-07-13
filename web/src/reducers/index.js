import { combineReducers } from 'redux'
import authentication from './authentication'
import flashMessages from './flashMessages'
import notifications from './notifications'
import uiSwitchers from './uiSwitchers'

const todoApp = combineReducers({
    authentication,
    flashMessages,
    notifications,
    uiSwitchers
  })
  
export default todoApp
