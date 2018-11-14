import invariant from 'invariant'
import firebase from '../firebase'
import {netlifyApi as http} from './http'

const database = firebase.database()

const getUserLoggedInState = () => new Promise((resolve, reject) => {
	if(firebase.auth().currentUser) return resolve()
	let retries = 0
	const intervalId = setInterval(() => {
		retries += 1
		if(retries > 10){
			clearInterval(intervalId)
			return reject(new Error('firebase: login timeout'))
		}
		if(firebase.auth().currentUser) return resolve()
	}, 500)
})

const getNetlifySubdomainFromFirebase = async () => {
	await getUserLoggedInState()
	const snapshot = await database.ref('netlify-subdomain').once('value')
	const subdomain = snapshot.val()
	if(typeof subdomain !== 'string'){
		throw new Error('firebase: missing netlify-subdomain')
	}
	return subdomain
}

const getNetlifySiteData = async ({token}) => {
	invariant(token, 'getNetlifySiteData: missing token')
	const subdomain = await getNetlifySubdomainFromFirebase()
	const {site_id: siteId, identity_instance_id: identityId} = await http.get(
		`/sites/${subdomain}.netlify.com`, {auth: {token}},
	)
	if(!siteId || !identityId) throw new Error('netlify: invalid response')
	return {siteId, identityId, subdomain}
}

export default getNetlifySiteData
