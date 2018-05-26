import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, {HTMLContent} from '../components/Content'
import Container from '../components/Container'
import Navbar from '../components/Navbar'

export const AuthorTemplate = ({
	content,
	contentComponent,
	helmet,
	name,
	semester,
}) => {
	const AuthorContent = contentComponent || Content

	return (
		<section>
			{helmet || ''}
			<h1>{name}</h1>
			<p>{semester}</p>
			<AuthorContent content={content} />
		</section>
	)
}

AuthorTemplate.propTypes = {
	content: PropTypes.string.isRequired,
	contentComponent: PropTypes.func,
	helmet: PropTypes.instanceOf(Helmet),
	name: PropTypes.string,
	semester: PropTypes.string,
}

const Author = ({data: {author}}) => {
	const {
		id,
		html,
		frontmatter: {title, semester},
	} = author
	return (
		<Fragment>
			<Navbar
				style={{position: 'sticky', top: 0, zIndex: 2}}
				links={[
					{href: '/about', label: 'Sobre'},
					{href: '/contact', label: 'Contato'},
				]}
			/>
			<Container>
				<AuthorTemplate
					content={html}
					contentComponent={HTMLContent}
					name={title}
					helmet={<Helmet title={`${title} | Blog`} />}
					semester={semester}
				/>
			</Container>
		</Fragment>
	)
}

Author.propTypes = {
	data: PropTypes.shape({
		author: PropTypes.shape({
			id: PropTypes.string.isRequired,
			html: PropTypes.string.isRequired,
			frontmatter: PropTypes.shape({
				title: PropTypes.string.isRequired,
				semester: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
}

export default Author

export const pageQuery = graphql`
	query AuthorByID($id: String!) {
		author: markdownRemark(id: {eq: $id}) {
			id
			html
			frontmatter {
				title
				semester
			}
		}
	}
`
