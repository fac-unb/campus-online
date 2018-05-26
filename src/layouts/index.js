import React from 'react'
import css from '../utils/reset.css'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import fontFace from '../utils/fontface'
import {colors, fonts} from '../constants'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const fontStyleSheet = [
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-Thin', 100, 'normal'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-ThinItalic', 100, 'italic'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-ExtraLight', 200, 'normal'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-ExtraLightItalic', 200, 'italic'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-Light', 300, 'normal'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-LightItalic', 300, 'italic'],
	['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-Regular', 400, 'normal'],
	['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-Italic', 400, 'italic'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-Text', 500, 'normal'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-TextItalic', 500, 'italic'],
	['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-Medium', 600, 'normal'],
	['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-MediumItalic', 600, 'italic'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-SemiBold', 700, 'normal'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-SemiBoldItalic', 700, 'italic'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-Bold', 800, 'normal'],
	// ['IBM Plex Sans', 'ibm-plex-sans/IBMPlexSans-BoldItalic', 800, 'italic'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-Light', 300, 'normal'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-LightItalic', 300, 'italic'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-Regular', 400, 'normal'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-Italic', 400, 'italic'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-Medium', 500, 'normal'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-MediumItalic', 500, 'italic'],
	[
		'Tiempos Headline',
		'tiempos-headline/TiemposHeadline-Semibold',
		600,
		'normal',
	],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-SemBdIta', 600, 'italic'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-Bold', 700, 'normal'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-BoldItalic', 700, 'italic'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-Black', 800, 'normal'],
	// ['Tiempos Headline', 'tiempos-headline/TiemposHeadline-BlackItalic', 800, 'italic'],
	['Tiempos Text', 'tiempos-text/TiemposText-Regular', 400, 'normal'],
	['Tiempos Text', 'tiempos-text/TiemposText-RegularItalic', 400, 'italic'],
	['Tiempos Text', 'tiempos-text/TiemposText-Semibold', 600, 'normal'],
	['Tiempos Text', 'tiempos-text/TiemposText-SemiBoldItalic', 600, 'italic'],
]
	.map(fontFace)
	.join('\n')

const Layout = ({children}) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
			color: colors.base,
			fontFamily: fonts.sans,
			background: colors.base03,
		}}
	>
		<style dangerouslySetInnerHTML={{__html: fontStyleSheet}} />
		<div
			style={{
				flex: '1 0 auto',
				width: '100%',
				paddingBottom: '8rem',
			}}
		>
			{children()}
		</div>
		<Footer style={{flex: 'none'}} />
	</div>
)

export default Layout
