import React from 'react'
import {withFirebase} from '../Firebase'

class FirebaseAuth extends React.Component {
	state = {isLoggedIn: false, error: null}
	refresh = user => {
		if(!user){
			this.setState({isLoggedIn: false})
			return
		}
		this.setState({
			id: user.uid,
			name: user.displayName,
			avatar: user.photoURL,
			email: user.email,
			isLoggedIn: true,
		})
	}
	handleError = error => this.setState({error, isLoggedIn: false})
	componentDidMount(){
		const auth = this.props.firebase.auth()
		this.refresh(auth.currentUser)
		this.unsubscribe = auth.onAuthStateChanged(this.refresh, this.handleError)
	}
	componentWillUnmount(){
		if(this.unsubscribe) this.unsubscribe()
	}
	render(){
		const {render, children = render} = this.props
		return children(this.state)
	}
}

export default withFirebase(FirebaseAuth)

