import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import {colors} from '../../constants'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import Container from '../../components/Container'
import {CardRow} from '../../components/CardGrid'
import PostCard from '../../components/PostCard'

class TagRoute extends React.Component {
	render() {
		const {
			pathContext: {tag},
			data: {
				site: {siteMetadata},
				blog: {posts, totalCount},
			},
		} = this.props

		const postLinks = posts.map(({post}) => (
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
				dark={true}
				alt={true}
			/>
		))

		const tagSup = `
			${totalCount} Matéria${totalCount === 1 ? '' : 's'} com a tag
		`

		return (
			<div
				style={{
					background: colors.base,
					color: 'white',
					marginBottom: '-8rem',
					paddingBottom: '8rem',
				}}
			>
				<Helmet title={`${siteMetadata.title} | ${tag}`} />
				<Navbar
					dark={true}
					style={{
						position: 'fixed',
						top: 0,
						zIndex: 20,
						color: 'white',
						background: colors.base,
					}}
				/>
				<Hero title={tag} sup={tagSup} navbar={false} />
				<section>
					<Container>
						<CardRow>{postLinks}</CardRow>
						<Link
							style={{
								display: 'block',
								fontSize: '1.125rem',
								lineHeight: '1.5rem',
								marginTop: '4rem',
								color: 'currentColor',
								marginBottom: '2rem',
								textDecoration: 'none',
							}}
							to="/tags/"
						>
							Ver todas as tags
						</Link>
					</Container>
				</section>
			</div>
		)
	}
}

export default TagRoute

export const tagPageQuery = graphql`
	query TagPage($tag: String) {
		site {
			siteMetadata {
				title
			}
		}
		blog: allMarkdownRemark(
			limit: 1000
			sort: {fields: [frontmatter___date], order: DESC}
			filter: {frontmatter: {tags: {in: [$tag]}}}
		) {
			totalCount
			posts: edges {
				post: node {
					fields {
						slug
					}
					frontmatter {
						title
						cover
						editorial
					}
				}
			}
		}
	}
`
