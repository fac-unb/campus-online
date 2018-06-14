import React from 'react'
import PropTypes from 'prop-types'
import Template from '.'

const Editorial = ({data: {markdownRemark}}) => {
	const {
		frontmatter: {title, color, semester},
		html,
	} = markdownRemark
	return (
		<Template name={title} color={color} semester={semester} bodyText={html} />
	)
}

Editorial.propTypes = {
	data: PropTypes.shape({
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
