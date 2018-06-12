import React from 'react'
import Helmet from 'react-helmet'
import Container from '../../components/Container'
import AuthorCard from '../../components/AuthorCard'

const AuthorsPage = ({data: {authorsList}}) => (
	<Container>
		<Helmet title={`Autores `} />
		<section>
			<h1>Autores</h1>
			{/* {JSON.stringify(authorsList.authors)} */}
			{authorsList.authors.map(({author}) => (
				<AuthorCard
					key={author.fields.slug}
					slug={author.fields.slug}
					avatar={author.frontmatter.image}
					name={author.frontmatter.title}
				/>
			))}
			<div />
		</section>
	</Container>
)

export default AuthorsPage

export const authorsPageQuery = graphql`
	query AuthorsQuery {
		authorsList: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___title]}
			filter: {frontmatter: {template: {eq: "author"}}}
		) {
			authors: edges {
				author: node {
					fields {
						slug
					}
					frontmatter {
						title
						template
						semester
						image
					}
				}
			}
		}
	}
`
