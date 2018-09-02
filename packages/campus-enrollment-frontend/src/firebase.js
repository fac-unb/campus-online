import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const app = firebase.initializeApp({
	apiKey: 'AIzaSyD530uyekDgOulHg5vgS9rE6EDAduqIzKM',
	authDomain: 'campus-unb.firebaseapp.com',
	databaseURL: 'https://campus-unb.firebaseio.com',
	projectId: 'campus-unb',
})

export default app
window.firebase = app
