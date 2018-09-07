import invariant from 'invariant'
import {netlifyApi as http} from './http'

const getEnrolledStudents = async ({siteId, identityId, token}) => {
	// [TODO]: implement pagination
	const url = `/sites/${siteId}/identity/${identityId}/users?sort=created_at`
	const {items = [], http: {status}} = await http.get(url, {auth: {token}})
	invariant(status < 400, 'netlify: status >= 400')
	return items
		.filter(student => !!student.id)
		.map(({user_metadata = {}, email, id, created_at}) => ({
			id, status: 'enrolled', date: created_at,
			name: user_metadata.full_name || 'unknown',
			email: email || '<unknown-email>',
		}))
}

export default getEnrolledStudents
