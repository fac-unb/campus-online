import React from 'react'
import PropTypes from 'prop-types'
import Template from '.'

const BlogPost = ({data: {markdownRemark, site}}) => {
	const {frontmatter, fields = {}, html} = markdownRemark
	return (
		<Template
			{...frontmatter}
			{...fields}
			siteTitle={site.siteMetadata.title}
			content={html}
		/>
	)
}

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			fields: PropTypes.object.isRequired,
			frontmatter: PropTypes.object.isRequired,
			html: PropTypes.node.isRequired,
		}),
		site: PropTypes.shape({
			siteMetadata: PropTypes.shape({
				title: PropTypes.string,
			}),
		}),
	}),
}

export default BlogPost

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: {eq: $id}) {
			html
			frontmatter {
				date
				title
				cover
				editorial
				tags
			}
		}
		site {
			siteMetadata {
				title
			}
		}
	}
`
//
// export const siteQuery = graphql`
// 	query Metadata() {
// 		site {
// 			siteMetadata {
// 				title
// 			}
// 		}
// 	}
// `
