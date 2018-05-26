import React from 'react'
import Navbar from '../components/Navbar'

const NotFoundPage = () => (
	<div>
		<Navbar
			style={{position: 'sticky', top: 0, zIndex: 2}}
			links={[
				{href: '/about', label: 'Sobre'},
				{href: '/contact', label: 'Contato'},
			]}
		/>
		<h1>NOT FOUND</h1>
		<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
	</div>
)

export default NotFoundPage
