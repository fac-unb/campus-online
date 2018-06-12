import React from 'react'
import Helmet from 'react-helmet'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import TextHero from '../../components/TextHero'

export const Editorial = ({name, color, siteTitle, bodyText}) => (
	<React.Fragment>
		<TextHero
			title={name}
			background={color}
			navbar={false}
			bodyText={bodyText}
		/>
		<Navbar
			background={color}
			dark={true}
			style={{position: 'fixed', top: 0, zIndex: 30}}
		/>
		<Container>
			<Helmet title={`${siteTitle} | ${name}`} />
			<section style={{padding: '6rem 0 8rem'}}>
				<div>[TODO]: MAP Articles HERE</div>
			</section>
		</Container>
	</React.Fragment>
)

export default Editorial
