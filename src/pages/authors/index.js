import React from 'react'
import Helmet from 'react-helmet'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import TextHero from '../../components/TextHero'
import AuthorCard from '../../components/AuthorCard'

const AuthorsPage = ({data: {authorsList, site}}) => (
	<React.Fragment>
		<Navbar style={{position: 'fixed', top: 0, zIndex: 2}} />
		<TextHero
			title="Autores"
			dark={true}
			sub={`${authorsList.authors.length} autores no total`}
			navbar={true}
		/>
		<Container>
			<Helmet title={`${site.siteMetadata.title} | Autores`} />
			<section style={{padding: '6rem 0 8rem'}}>
				{/* {JSON.stringify(authorsList.authors)} */}
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
				<div />
			</section>
		</Container>
	</React.Fragment>
)

export default AuthorsPage

export const authorsPageQuery = graphql`
	query AuthorsQuery {
		site {
			siteMetadata {
				title
			}
		}
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
