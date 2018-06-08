import React from 'react'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import {CardRow} from '../components/CardGrid'
import Navbar from '../components/Navbar'
import StoriesTitle from '../components/StoriesTitle'
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
			blog: {
				posts: [{post: hero}, ...posts],
			},
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
					<HomeHero
						url={hero.fields.slug}
						title={hero.frontmatter.title}
						date={hero.frontmatter.date}
						excerpt={hero.excerpt}
						editorial={hero.frontmatter.editorial}
						author={hero.frontmatter.author}
						cover={hero.frontmatter.cover}
						key={hero.id}
					/>
					<Container>
						<section>
							<StoriesTitle
								title="Publicações recentes"
								label="Ver todas"
								to="/posts"
							/>
							{posts && (
								<CardRow>
									{posts.map(({post}, index) => (
										<PostCard
											reverse={index % 2}
											url={post.fields.slug}
											title={post.frontmatter.title}
											date={post.frontmatter.date}
											excerpt={post.excerpt}
											editorial={post.frontmatter.editorial}
											cover={post.frontmatter.cover}
											author={post.frontmatter.author}
											dark={post.frontmatter.featured}
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
						featured
						tags
						date
					}
				}
			}
		}
	}
`
