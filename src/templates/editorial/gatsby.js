import React from 'react'
import PropTypes from 'prop-types'
import Template from '.'

const Editorial = ({data: {markdownRemark, site}}) => {
	const {
		frontmatter: {title, color, semester},
		html,
	} = markdownRemark
	return (
		<Template
			name={title}
			color={color}
			semester={semester}
			siteTitle={site.siteMetadata.title}
			bodyText={html}
		/>
	)
}

Editorial.propTypes = {
	data: PropTypes.shape({
		site: PropTypes.shape({
			siteMetadata: PropTypes.shape({
				title: PropTypes.string,
			}),
		}),
		markdownRemark: PropTypes.shape({
			html: PropTypes.node,
			frontmatter: PropTypes.shape({
				title: PropTypes.string,
				color: PropTypes.string,
				semester: PropTypes.string,
			}),
		}),
	}),
}

export default Editorial

export const pageQuery = graphql`
	query EditorialByID($id: String!) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(id: {eq: $id}) {
			html
			frontmatter {
				color
				title
				semester
			}
		}
	}
`
