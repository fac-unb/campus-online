const admin = require('firebase-admin')

const ref = path => admin.database().ref(path)
const createTask = ({type = 'UNKNOWN', payload, timestamp, userId}) => {
	const createdAt = timestamp ? (new Date(timestamp)).valueOf() : Date.now()
	return ref('/tasks').push({
		type: type,
		status: 'queue',
		payload: payload,
		createdBy: userId,
		createdAt: createdAt,
		updatedAt: createdAt,
	})
}

module.exports = createTask
