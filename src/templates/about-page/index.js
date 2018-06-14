import React from 'react'
import {colors} from '../../constants'
import MetaTags from '../../components/MetaTags'
import Navbar from '../../components/Navbar'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import Text from '../../components/Text'
import Content from '../../components/Content'
import AboutHero from '../../components/AboutHero'
import Items from '../../components/Items'

const AboutPage = ({title, items, content}) => (
	<div style={{overflowX: 'hidden', position: 'relative'}}>
		<MetaTags title={title} />
		<Navbar
			style={{
				position: 'fixed',
				top: 0,
				zIndex: 2,
				background: colors.base03,
			}}
		/>
		<AboutHero style={{marginTop: '7rem'}} />
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
