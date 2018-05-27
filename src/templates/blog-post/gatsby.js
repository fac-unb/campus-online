import React from 'react'
import PropTypes from 'prop-types'
import Template from '.'

const BlogPost = ({data: {markdownRemark}}) => {
	const {frontmatter, html} = markdownRemark
	return <Template {...frontmatter} content={html} />
}

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object.isRequired,
			html: PropTypes.node.isRequired,
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
				author
				tags
			}
		}
	}
`
