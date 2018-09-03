import React from 'react'
import {Provider as ReduxProvider} from 'react-redux'
import {Provider as FirebaseProvider} from './Firebase'
import store from '../store'
import firebase from '../firebase'
import Home from './Home'

/* eslint-disable no-mixed-operators */

export default class App extends React.Component {
	/* globals process */
	static defaultProps = {isTest: process.env.NODE_ENV === 'test'}
	render(){
		const {isTest, store: overideStore} = this.props
		return (
			<ReduxProvider store={isTest && overideStore || store}>
				<FirebaseProvider value={firebase}>
					<Home/>
				</FirebaseProvider>
			</ReduxProvider>
		)
	}
}
