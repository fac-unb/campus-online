import React from 'react'
import PropTypes from 'prop-types'
import Template from '.'

const AboutPage = ({data: {markdownRemark}}) => {
	const {frontmatter, html} = markdownRemark
	return <Template {...frontmatter} content={html} />
}

AboutPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object.isRequired,
			html: PropTypes.node.isRequired,
		}),
	}),
}

export default AboutPage

export const aboutPageQuery = graphql`
	query AboutPage($id: String!) {
		markdownRemark(id: {eq: $id}) {
			html
			frontmatter {
				title
			}
		}
	}
`
