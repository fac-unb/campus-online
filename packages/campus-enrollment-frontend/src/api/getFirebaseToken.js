import invariant from 'invariant'
import {firebaseFunctions as http} from './http'

const getFirebaseToken = async token => {
	invariant(token, 'getFirebaseToken: input token is missing')
	const res = await http.get('token', {auth: {token}, credentials: 'include'})
	const {access_token} = res
	invariant(access_token, 'getFirebaseToken: output token is missing')
	return access_token
}

export default getFirebaseToken
