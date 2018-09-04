import {combineReducers} from 'redux'
import auth, {middleware as authMiddleware} from './auth'
import netlify, {middleware as netlifyMiddleware} from './netlify'
import students, {middleware as studentsMiddleware} from './students'

const rootReducer = combineReducers({auth, netlify, students})

export default rootReducer
export const middlewares = [
	authMiddleware,
	netlifyMiddleware,
	studentsMiddleware,
]
