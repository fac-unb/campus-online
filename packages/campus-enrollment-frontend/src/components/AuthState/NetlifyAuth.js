import {connect} from 'react-redux'
import {login, logout} from '../../reducers/auth'

const config = {
	url: 'https://app.netlify.com/authorize',
	client: '07b77d90049181febc5fd7b52d9a873700248ee99bdb1ba594f7853b878e3c3e',
	redirect: window.location.href,
	width: 512, // Width, in pixels, of popup window. Optional, default: 400
	height: 400 // Height, in pixels, of popup window. Optional, default: 400
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
