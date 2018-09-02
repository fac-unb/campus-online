/* eslint-env commonjs */
import {createStore, applyMiddleware, compose as _compose} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer, {middlewares} from '../reducers'

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _compose

const configureStore = (preloadedState = {}) => {
	const store = createStore(
		rootReducer,
		preloadedState,
		compose(
			applyMiddleware(thunk, createLogger({collapsed: true}), ...middlewares),
		),
	)

	if(module.hot){
		module.hot.accept('../reducers', () => {
			store.replaceReducer(rootReducer)
		})
	}

	return store
}

export default configureStore
