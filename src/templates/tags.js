import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

class TagRoute extends React.Component {
	render() {
		const {
			pathContext: {tag},
			data: {
				site: {siteMetadata: title},
				blog: {posts, totalCount},
			},
		} = this.props

		const postLinks = posts.map(post => (
			<li key={post.node.fields.slug}>
				<Link to={post.node.fields.slug}>
					<h2>{post.node.frontmatter.title}</h2>
				</Link>
			</li>
		))

		const tagHeader = `${totalCount} post${
			totalCount === 1 ? '' : 's'
		} tagged with “${tag}”`

		return (
			<section>
				<Helmet title={`${tag} | ${title}`} />
				<div>
					<div>
						<div>
							<h3>{tagHeader}</h3>
							<ul>{postLinks}</ul>
							<p>
								<Link to="/tags/">Browse all tags</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
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
					}
				}
			}
		}
	}
`
