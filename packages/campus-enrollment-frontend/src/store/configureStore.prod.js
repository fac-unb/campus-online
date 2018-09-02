import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer, {middlewares} from '../reducers'

const configureStore = (preloadedState = {}) => createStore(
	rootReducer,
	preloadedState,
	applyMiddleware(thunk, ...middlewares),
)

export default configureStore
