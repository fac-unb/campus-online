import {combineReducers} from 'redux'
import auth, {middleware as authMiddleware} from './auth'

const rootReducer = combineReducers({auth})

export default rootReducer
export const middlewares = [authMiddleware]
