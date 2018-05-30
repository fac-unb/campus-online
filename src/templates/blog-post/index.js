import React from 'react'
import Helmet from 'react-helmet'
import Content from '../../components/Content'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import Navbar from '../../components/Navbar'
import HomeHero from '../../components/HomeHero'
import Text from '../../components/Text'
import Tags from '../../components/Tags'

const BlogPost = ({content, tags, date, cover, editorial, title}) => {
	return (
		<main>
			<Helmet title={`${title} | Blog`} />
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
				</Row>
				{tags && tags.length ? (
					<div>
						<h4>Tags</h4>
						<ul>
							<Tags tags={tags} />
						</ul>
					</div>
				) : null}
			</Container>
		</main>
	)
}

export default BlogPost
