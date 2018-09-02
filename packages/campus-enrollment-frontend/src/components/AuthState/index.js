import React from 'react'
import NetlifyAuth from './NetlifyAuth'
import FirebaseAuth from './FirebaseAuth'

const AuthState = ({render, children = render}) => (
	<NetlifyAuth render={
		({isLoggedIn: state1, isLoading: loading, error: err1, action: action1}) =>
			<FirebaseAuth render={
				({isLoggedIn: state2, error: err2, ...user}) => {
					const isLoading = loading || (state1 && state1 !== state2)
					const isLoggedIn = state1 && state2
					const error = err1 || err2
					const action = isLoading ? null : action1
					return children({isLoggedIn, isLoading, error, action, user})
				}
			}/>
	}/>
)

export default AuthState
