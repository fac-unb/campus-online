import {connect} from 'react-redux'
import {login, logout} from '../../reducers/auth'

/* globals process */
const config = {
	url: 'https://app.netlify.com/authorize',
	client: process.env.REACT_APP_NETLIFY_CLIENT_ID,
	redirect: window.location.href,
	width: 512, // Width, in pixels, of popup window. Optional, default: 400
	height: 420 // Height, in pixels, of popup window. Optional, default: 400
}


const NetlifyAuth = ({
	isLoggedIn, isLoading, error, login, logout, render, children = render,
}) => children({
	isLoggedIn, isLoading, error,
	action: isLoggedIn ? logout : (isLoading ? null : login),
})


const mapStateToProps = ({auth}) => ({
	isLoggedIn: auth.isLoggedIn,
	isLoading: auth.isLoggingIn,
	error: auth.error,
})

const mapDispatchToProps = {login: () => login(config), logout}

export default connect(mapStateToProps, mapDispatchToProps)(NetlifyAuth)
