import {createAction, handleActions} from 'redux-actions'
import {compose} from 'recompose'
import * as api from '../api'
import * as netlify from './netlify'

const castArray = v => Array.isArray(v) ? v : [v]
const getSortedByDateArray = byId => Object.keys(byId).sort(
	(a, b) => new Date(byId[a].date) - new Date(byId[b].date)
)

const uniq = array => [...new Set(castArray(array))]
const intersect = (array1, array2) => array1.filter(x => array2.includes(x))
const uniqSect = compose(uniq, intersect)

const idleState = {byId: {}, allIds: [], selectedIds: [], isFetching: false}
const initialState = {...idleState, isWaiting: true}

// [ACTIONS]
export const fetching = createAction('enrollment/students/fetching')
export const receive  = createAction('enrollment/students/receive')
export const error    = createAction('enrollment/students/error')
export const select   = createAction('enrollment/students/select')
export const unselect = createAction('enrollment/students/unselect')
export const toggle   = createAction('enrollment/students/toggle')

// [REDUCER]
const reducer = handleActions({
	[fetching]:      () => ({...idleState, isFetching: true}),
	[netlify.error]: () => idleState,
	[netlify.clear]: () => initialState,
	[error]:         (state, {payload}) => ({...idleState, error: payload}),
	[receive]:       (state, {payload}) => {
		const students = castArray(payload || []).reduce(
			(obj, item) => (item || {}).id ? ({...obj, [item.id]: item}) : obj, {},
		)
		const byId = {...state.byId, ...students}
		const allIds = getSortedByDateArray(byId)
		const selectedIds = uniqSect(state.selectedIds, allIds)
		return {...state, byId, allIds, selectedIds}
	},
	[select]: ({selectedIds, ...state}, {payload: id}) => ({...state,
		selectedIds: uniqSect([...selectedIds, id], state.allIds),
	}),
	[unselect]: ({selectedIds, ...state}, {payload: id}) => ({...state,
		selectedIds: uniqSect(selectedIds.filter(a => a !== id), state.allIds),
	}),
	[toggle]: (state, {payload: id}) => (
		reducer(state, state.selectedIds.includes(id) ? unselect(id) : select(id))
	),
}, initialState)

export default reducer

// [MIDDLEWARE]
export const middleware = store => {
	// [TODO]: handle firebase user tasks
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
