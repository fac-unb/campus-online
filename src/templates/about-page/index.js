import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../../components/Navbar'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import Text from '../../components/Text'
import Content from '../../components/Content'
import AboutHero from '../../components/AboutHero'
import Items from '../../components/Items'

const AboutPage = ({siteTitle, title, items, content}) => (
	<div style={{background: 'white'}}>
		<Helmet>
			<title>
				{siteTitle} | {title}
			</title>
		</Helmet>
		<Navbar
			style={{
				position: 'sticky',
				top: 0,
				zIndex: 2,
			}}
		/>
		<AboutHero />
		<Container>
			{items.length && <Items items={items} xs={12} />}
			{content && (
				<section style={{margin: '2rem 0 8rem'}}>
					<Row>
						<Cell xs={12} lg={8}>
							<Text>
								<Content>{content}</Content>
							</Text>
						</Cell>
					</Row>
				</section>
			)}
		</Container>
	</div>
)

export default AboutPage
