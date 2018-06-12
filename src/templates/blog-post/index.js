import React from 'react'
import Helmet from 'react-helmet'
import Content from '../../components/Content'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import Navbar from '../../components/Navbar'
import HomeHero from '../../components/HomeHero'
import Text from '../../components/Text'
import Tags from '../../components/Tags'
import SideSection from '../../components/SideSection'

const BlogPost = ({
	content,
	tags,
	date,
	cover,
	editorial,
	title,
	author,
	siteTitle,
}) => {
	return (
		<main style={{paddingBottom: '8rem'}}>
			<Helmet title={`${siteTitle} | ${title}`} />
			<Navbar
				style={{position: 'fixed', top: 0, zIndex: 2}}
				links={[
					{href: '/about', label: 'Sobre'},
					{href: '/contact', label: 'Contato'},
				]}
			/>
			<HomeHero title={title} date={date} cover={cover} editorial={editorial} />
			<Container>
				<Row>
					<Cell xs={12} lg={8}>
						<Text>
							<Content>{content}</Content>
						</Text>
					</Cell>
					<Cell xs={0} lg={1} />
					<Cell xs={12} lg={3} style={{position: 'sticky', top: '6rem'}}>
						{tags.length && (
							<div style={{width: '100%'}}>
								<SideSection title="Tags" to="/tags" count={tags} />
								<Tags tags={tags} style={{marginBottom: '3em'}} />
								<SideSection title="Autor" to="/authors" />
								{author}
							</div>
						)}
					</Cell>
				</Row>
			</Container>
		</main>
	)
}

export default BlogPost
