const invariant = require('invariant')
const admin = require('firebase-admin')
const netlify = require('../lib/netlify')

const auth = admin.auth()
const ref = path => admin.database().ref(path)
const getValue = path => ref(path).once('value').then(s => s.val())

const fetchNetlifyUserInfo = async accessToken => {
	const headers = {Authorization: `Bearer ${accessToken}`}
	const {data: user} = await netlify.get('user', {headers})

	invariant(user, 'error on user info')
	invariant(user.id, 'error on user info, missing id')
	invariant(typeof user.id === 'string', 'error on user info, id not string')

	const subdomain = await getValue('/netlify-subdomain')
	const {data} = await netlify.get(`sites/${subdomain}.netlify.com`, {headers})
	invariant(data.site_id, 'access denied')

	return {
		uid: user.id.toLowerCase(),
		displayName: user.full_name,
		photoURL: user.avatar_url,
		email: user.email,
		emailVerified: user.email ? true : undefined,
	}
}

const ensureUser = async ({uid, ...metadata}) => {
	try{
		return await auth.updateUser(uid, metadata)
	}catch(err){
		return await auth.createUser({uid, ...metadata})
	}
}

const createFirebaseAccount = async (user, accessToken) => {
	const {uid} = user
	await Promise.all([ensureUser(user), ref(`/tokens/${uid}`).set(accessToken)])
	const token = await auth.createCustomToken(uid)
	console.log(`success: created user token for '${uid}'`)
	return token
}

module.exports = {fetchNetlifyUserInfo, createFirebaseAccount}
