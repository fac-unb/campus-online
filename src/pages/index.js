import React from 'react'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import {CardRow} from '../components/CardGrid'
import Navbar from '../components/Navbar'
import HomeHero from '../components/HomeHero'
import PostCard from '../components/PostCard'

export default class IndexPage extends React.Component {
	handleScriptLoad() {
		if (window.netlifyIdentity) {
			window.netlifyIdentity.on('init', user => {
				if (!user) {
					window.netlifyIdentity.on('login', () => {
						document.location.href = '/admin/'
					})
				}
			})
		}
		window.netlifyIdentity.init()
	}
	render() {
		const {
			blog: {posts},
		} = this.props.data
		return (
			<div>
				<Navbar
					style={{position: 'fixed', top: 0, zIndex: 2}}
					links={[
						{href: '/about', label: 'Sobre'},
						{href: '/contact', label: 'Contato'},
					]}
				/>
				<main>
					{posts
						.slice(0, 1)
						.map(({post}) => (
							<HomeHero
								url={post.fields.slug}
								title={post.frontmatter.title}
								date={post.frontmatter.date}
								excerpt={post.excerpt}
								editorial={post.frontmatter.editorial}
								author={post.frontmatter.author}
								cover={post.frontmatter.cover}
								key={post.id}
							/>
						))}
					<Container>
						<section>
							<h1>Latest Stories</h1>
							{posts && (
								<CardRow>
									{posts
										.slice(1)
										.map(({post}) => (
											<PostCard
												url={post.fields.slug}
												title={post.frontmatter.title}
												date={post.frontmatter.date}
												excerpt={post.excerpt}
												editorial={post.frontmatter.editorial}
												cover={post.frontmatter.cover}
												author={post.frontmatter.author}
												key={post.id}
												size={1}
											/>
										))}
								</CardRow>
							)}
						</section>
					</Container>
				</main>
			</div>
		)
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		blog: PropTypes.shape({
			posts: PropTypes.array,
		}),
	}),
}

export const pageQuery = graphql`
	query IndexQuery {
		blog: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___date]}
			filter: {frontmatter: {template: {eq: "blog-post"}}}
		) {
			posts: edges {
				post: node {
					excerpt(pruneLength: 400)
					id
					fields {
						slug
					}
					frontmatter {
						title
						template
						editorial
						cover
						author
						tags
						date
					}
				}
			}
		}
	}
`
