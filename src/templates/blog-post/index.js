import React from 'react'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content from '../../components/Content'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import HomeHero from '../../components/HomeHero'
import Text from '../../components/Text'

const BlogPost = ({content, tags, date, cover, editorial, title}) => {
	return (
		<article>
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
				<Text>
					<Content>{content}</Content>
				</Text>
				{tags && tags.length ? (
					<div>
						<h4>Tags</h4>
						<ul>
							{tags.map(tag => (
								<li key={tag}>
									<Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
								</li>
							))}
						</ul>
					</div>
				) : null}
			</Container>
		</article>
	)
}

export default BlogPost
