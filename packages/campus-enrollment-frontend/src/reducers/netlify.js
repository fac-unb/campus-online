import {createAction, handleActions} from 'redux-actions'
import firebase from '../firebase'
import * as api from '../api'

// [PRIVATE_ACTIONS]
const loading = createAction('enrollment/netlify/loading')

// [ACTIONS]
export const error   = createAction('enrollment/netlify/error')
export const replace = createAction('enrollment/netlify/replace')
export const clear   = createAction('enrollment/netlify/clear')

// [REDUCER]
export default handleActions({
	[error]:   (state, {payload}) => ({error: payload}),
	[replace]: (state, {payload}) => (payload),
	[loading]: () => ({isLoading: true}),
	[clear]:   () => ({}),
}, {})

// [MIDDLEWARE]
export const middleware = store => {
	firebase.auth().onAuthStateChanged(
		async user => {
			if(!user) return store.dispatch(clear())
			store.dispatch(loading())
			try{
				const {auth: {token}} = store.getState()
				store.dispatch(replace(await api.getNetlifySiteData({token})))
			}catch({message}){
				store.dispatch(error(message))
			}
		}
	)
	return next => action => next(action)
}
