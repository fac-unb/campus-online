import React from 'react'
import MetaTags from '../../components/MetaTags'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import AuthorCard from '../../components/AuthorCard'

const AuthorsPage = ({data: {authorsList}}) => (
	<React.Fragment>
		<Navbar style={{position: 'fixed', top: 0, zIndex: 2}} />
		<Hero
			title="Autores"
			sub={`${authorsList.authors.length} autores no total`}
		/>
		<Container>
			<MetaTags title="Autores" />
			<section style={{padding: '6rem 0 8rem', overflow: 'hidden'}}>
				<div style={{display: 'flex', flexWrap: 'wrap', margin: '0 -2rem'}}>
					{authorsList.authors.map(({author}) => (
						<div key={author.fields.slug} style={{padding: '1rem 2rem'}}>
							<AuthorCard
								slug={author.fields.slug}
								avatar={author.frontmatter.image}
								name={author.frontmatter.title}
							/>
						</div>
					))}
				</div>
			</section>
		</Container>
	</React.Fragment>
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
