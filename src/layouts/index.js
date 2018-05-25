import React from 'react'
import css from '../utils/reset.css'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {colors, fonts} from '../constants'

const Layout = ({children}) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			color: colors.base,
			fontFamily: fonts.text,
			background: colors.base03,
		}}
	>
		<Navbar
			style={{position: 'fixed', top: 0, zIndex: 2}}
			links={[
				{href: '/about', label: 'Sobre'},
				{href: '/contact', label: 'Contato'},
			]}
		/>
		<main
			style={{
				flex: '1 0 auto',
				width: '100%',
				paddingBottom: '8rem',
			}}
		>
			{children()}
		</main>
		<Footer style={{flex: 'none'}} />
	</div>
)

export default Layout
