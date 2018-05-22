import React from 'react'
import css from '../utils/reset.css'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {colors, fonts} from '../constants'

const Layout = ({children}) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			height: '100vh',
			color: colors.base,
			fontFamily: fonts.text,
		}}
	>
		<Navbar style={{flex: 'none'}} />
		<main
			style={{
				flex: '1 0 auto',
				width: '100%',
				background: colors.base03,
				paddingBottom: '8rem',
			}}
		>
			<Container>{children()}</Container>
		</main>
		<Footer style={{flex: 'none'}} />
	</div>
)

export default Layout
