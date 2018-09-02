const admin = require('firebase-admin')
const functions = require('firebase-functions')
const {generate} = require('generate-password')
const netlify = require('../lib/netlify')
const identity = require('../lib/netlify-identity')

const fnRef = path => functions.runWith({timeoutSeconds: 30}).database.ref(path)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const getValue = p => admin.database().ref(p).once('value').then(s => s.val())
const refFromURL = url => admin.database().refFromURL(url)
const {TIMESTAMP} = admin.database.ServerValue
const update = (ref, status = null, {result = null, message = null} = {}) => (
	ref.update({status, message, result, updatedAt: TIMESTAMP})
)
const generator = () => (
	generate({length: 32, strict: true, symbols: true, numbers: true})
)

// [TODO]: refactor into subfolders
const handlers = {
	AUTHOR_INVITE: async ({payload: {email, full_name, ref_url}}) => {
		try{
			if(!email) throw new Error(`missing email`)
			const subdomain = await getValue('/netlify-subdomain')
			const {signup, recover} = identity(subdomain)
			const result = await signup({email, full_name, password: generator()})
			await delay(2500)
			await recover({email})
			return result
		}catch(e){
			throw e
		}finally{
			if(ref_url) await refFromURL(ref_url).remove()
		}
	},
	AUTHOR_RETIRE: async ({createdBy, payload: {user_id, ref_url}}) => {
		try{
			if(!user_id) throw new Error(`missing user_id`)
			const [subdomain, token] = await Promise.all([
				getValue('/netlify-subdomain'),
				getValue(`/tokens/${createdBy}`),
			])
			if(!token) throw new Error(`missing token for '${createdBy}'`)

			const headers = {Authorization: `Bearer ${token}`}
			const {data: {site_id, identity_instance_id}} = await netlify.get(
				`sites/${subdomain}.netlify.com`, {headers},
			)
			if(!site_id || !identity_instance_id) throw new Error('access denied')

			const users = `sites/${site_id}/identity/${identity_instance_id}/users`
			await netlify.delete(`${users}/${user_id}`, {headers})
		}catch(e){
			throw e
		}finally{
			if(ref_url) await refFromURL(ref_url).remove()
		}
	},
	AUTHOR_UPDATE: async ({createdBy, payload = {}}) => {
		const {user_id, email, full_name, ref_url} = payload
		try{
			if(!user_id) throw new Error(`missing user_id`)
			const [subdomain, token] = await Promise.all([
				getValue('/netlify-subdomain'),
				getValue(`/tokens/${createdBy}`),
			])
			if(!token) throw new Error(`missing token for '${createdBy}'`)

			const headers = {Authorization: `Bearer ${token}`}
			const {data: {site_id, identity_instance_id}} = await netlify.get(
				`sites/${subdomain}.netlify.com`, {headers},
			)
			if(!site_id || !identity_instance_id) throw new Error('access denied')

			const users = `sites/${site_id}/identity/${identity_instance_id}/users`
			const user_metadata = full_name && {full_name}
			const response = await netlify.put(
				`${users}/${user_id}`,
				{email, user_metadata},
				{headers},
			)
			return response.data
		}catch(e){
			throw e
		}finally{
			if(ref_url) await refFromURL(ref_url).remove()
		}
	},
}

const tasks = fnRef('/tasks/{taskId}')
module.exports = tasks.onCreate(async snapshot => {
	const task = snapshot.val() || {}
	const {type, status} = task
	if(status && status !== 'queue'){
		return console.log(`invalid status '${status}', aborting...`)
	}
	const taskRef = refFromURL(snapshot.ref.toString())
	const handler = handlers[type]
	if(!handler){
		console.log(`no handler for '${type}', skipping...`)
		return update(taskRef, 'skipped')
	}
	try{
		const result = await handler(task)
		console.log('success:', task, result)
		return update(taskRef, 'done', {result})
	}catch(error){
		console.error(error)
		return update(taskRef, 'error', {message: error.message})
	}
})
