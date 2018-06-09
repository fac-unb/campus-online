import React from 'react'
import Helmet from 'react-helmet'
import Content from '../../components/Content'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import Navbar from '../../components/Navbar'
import HomeHero from '../../components/HomeHero'
import Text from '../../components/Text'
import Tags from '../../components/Tags'

const BlogPost = ({content, tags, date, cover, editorial, title, author}) => {
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
					<Cell xs={0} lg={1} />
					<Cell xs={12} lg={3} style={{position: 'sticky', top: '6rem'}}>
						<div>
							{tags &&
								tags.length && (
									<ul>
										<Tags tags={tags} />
									</ul>
								)}
							{author}
						</div>
					</Cell>
				</Row>
			</Container>
		</main>
	)
}

export default BlogPost
