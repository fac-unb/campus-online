import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

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
		const {blog: {posts}} = this.props.data
		return (
			<section>
				<div>
					<div>
						<h1>Latest Stories</h1>
					</div>
					{posts.map(({post}) => (
						<div key={post.id}>
							<p>
								<Link to={post.fields.slug}>{post.frontmatter.title}</Link>
								<span> &bull; </span>
								<small>{post.frontmatter.date}</small>
							</p>
							<p>
								{post.excerpt}
								<br />
								<br />
								<Link to={post.fields.slug}>Keep Reading →</Link>
							</p>
						</div>
					))}
				</div>
			</section>
		)
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		blog: PropTypes.shape({
			edges: PropTypes.array,
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
						date(formatString: "MMMM DD, YYYY")
					}
				}
			}
		}
	}
`
