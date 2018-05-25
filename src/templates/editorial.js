import React from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

export const EditorialTemplate = ({helmet, name, semester, color}) => {
	return (
		<section style={{color: color}}>
			{helmet || ''}
			<h1>{name}</h1>
			<p>{semester}</p>
		</section>
	)
}

EditorialTemplate.propTypes = {
	helmet: PropTypes.instanceOf(Helmet),
	name: PropTypes.string,
	semester: PropTypes.string,
}

const Editorial = ({data: {editorial}}) => {
	const {
		id,
		html,
		frontmatter: {title, semester, color},
	} = editorial
	return (
		<EditorialTemplate
			name={title}
			color={color}
			helmet={<Helmet title={`${title} | Blog`} />}
			semester={semester}
		/>
	)
}

Editorial.propTypes = {
	data: PropTypes.shape({
		editorial: PropTypes.shape({
			id: PropTypes.string,
			html: PropTypes.string,
			frontmatter: PropTypes.shape({
				title: PropTypes.string,
				semester: PropTypes.string,
			}),
		}),
	}),
}

export default Editorial

export const pageQuery = graphql`
	query EditorialByID($id: String!) {
		editorial: markdownRemark(id: {eq: $id}) {
			id
			html
			frontmatter {
				color
				title
				semester
			}
		}
	}
`
