import {createAction, handleActions} from 'redux-actions'
import * as api from '../api'
import * as netlify from './netlify'

const castArray = v => Array.isArray(v) ? v : [v]
const getSortedByDateArray = byId => Object.keys(byId).sort(
	(a, b) => new Date(byId[a].date) - new Date(byId[b].date)
)

const idleState = {byId: {}, allIds: [], isFetching: false}
const initialState = {...idleState, isWaiting: true}

// [ACTIONS]
export const fetching = createAction('enrollment/students/fetching')
export const receive  = createAction('enrollment/students/receive')
export const error    = createAction('enrollment/students/error')

// [REDUCER]
export default handleActions({
	[error]:         (state, {payload}) => ({...idleState, error: payload}),
	[fetching]:      () => ({...idleState, isFetching: true}),
	[receive]:       (state, {payload = []}) => {
		const students = castArray(payload).reduce(
			(obj, item) => (item || {}).id ? ({...obj, [item.id]: item}) : obj, {},
		)
		const byId = {...state.byId, ...students}
		return {...state, byId, allIds: getSortedByDateArray(byId)}
	},
	[netlify.error]: () => idleState,
	[netlify.clear]: () => initialState,
}, initialState)

// [MIDDLEWARE]
export const middleware = store => {
	return next => async action => {
		next(action)
		if(action.type !== String(netlify.replace)) return
		const {
			netlify: {siteId, identityId},
			auth: {token},
			students: {isWaiting, isFetching},
		} = store.getState()
		if(!isWaiting || isFetching || !siteId || !token) return
		const students = await api.getEnrolledStudents({siteId, identityId, token})
		store.dispatch(receive(students))
	}
}
