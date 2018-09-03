import {connect} from 'react-redux'
import {login, logout} from '../../reducers/auth'

const config = {
	url: 'https://app.netlify.com/authorize',
	client: '3905bdb7e9bb641c2e5a5a8ae4b845e9a6181dcb2e8ee6337e226e11593a1325',
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
