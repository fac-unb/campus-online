import React from 'react'
import PropTypes from 'prop-types'
import Template from '.'

const AboutPage = ({data: {markdownRemark, site}}) => {
	const {frontmatter, html} = markdownRemark
	return (
		<Template
			siteTitle={site.siteMetadata.title}
			{...frontmatter}
			content={html}
		/>
	)
}

AboutPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
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

export default AboutPage

export const aboutPageQuery = graphql`
	query AboutPage($id: String!) {
		markdownRemark(id: {eq: $id}) {
			html
			frontmatter {
				title
			}
		}
		site {
			siteMetadata {
				title
			}
		}
	}
`
