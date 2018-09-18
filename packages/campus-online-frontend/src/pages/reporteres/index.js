import {graphql} from 'gatsby'
import React from 'react'
import {map, get, flow} from 'lodash/fp'
import {mapProps, compose} from 'recompose'
import flattenAuthorInfo from '../../fragments/AuthorInfo'
import {withLayout} from '../../components/Layout'
import MetaTags from '../../components/MetaTags'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import AuthorCard from '../../components/AuthorCard'

const AuthorsPage = ({authors}) => (
	<React.Fragment>
		<Navbar style={{position: 'fixed', top: 0, zIndex: 2}} />
		<Hero title="Repórteres" sub={`${authors.length} repórteres no total`} />
		<Container>
			<MetaTags title="Repórteres" />
			<section style={{padding: '6rem 0 8rem', overflow: 'hidden'}}>
				<div style={{display: 'flex', flexWrap: 'wrap', margin: '0 -2rem'}}>
					{authors.map(author => (
						<div key={author.url} style={{padding: '1rem 2rem'}}>
							<AuthorCard {...author} />
						</div>
					))}
				</div>
			</section>
		</Container>
	</React.Fragment>
)

const enhance = compose(
	withLayout,
	mapProps(
		flow([
			get('data.authorList.authors'),
			map(flow([get('author'), flattenAuthorInfo])),
			authors => ({authors}),
		]),
	),
)

export default enhance(AuthorsPage)
export const authorsPageQuery = graphql`
	query AuthorsQuery {
		authorList: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___semester, frontmatter___title]}
			filter: {frontmatter: {template: {eq: "author"}}}
		) {
			authors: edges {
				author: node {
					...AuthorInfo
				}
			}
		}
	}
`
