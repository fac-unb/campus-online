import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../reducers/auth'

const formatMessage = (message = 'unknown error') => [
	`Ocorreu um erro de autênticação:\n${message}\n`,
	'faça login novamente.',
].join('\n')

class ErrorHandler extends React.Component {
	componentDidUpdate(){
		const {authError, isLoggedIn, logout} = this.props
		if(authError && isLoggedIn){
			logout()
			setTimeout(() => {
				alert(formatMessage(authError))
			})
		}
	}
	render(){
		return null
	}
}

const mapStateToProps = ({netlify, auth}) => ({
	authError: netlify.error || auth.error,
	isLoggedIn: auth.isLoggedIn,
})

const mapDispatchToProps = {logout}

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(ErrorHandler)
