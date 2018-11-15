import {graphql} from 'gatsby'
import React from 'react'
import {mapProps, compose} from 'recompose'
import {get, kebabCase} from 'lodash/fp'
import styled from 'styled-components'
import {colors} from '../../constants'
import flattenBlogPostInfo from '../../fragments/BlogPostInfo'
import flattenAuthorInfo from '../../fragments/AuthorInfo'
import flattenEditorialInfo from '../../fragments/EditorialInfo'
import {withLayout} from '../../components/Layout'
import MetaTags from '../../components/MetaTags'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import {CardRow} from '../../components/CardGrid'
import Navbar from '../../components/Navbar'
import FixedTitle from '../../components/FixedTitle'
import PostCard from '../../components/PostCard'
import Editorials from '../../components/Editorials'
import ScrollList from '../../components/ScrollList'

const LayoutGrid = styled(Row)`
	justify-content: space-between;
`

const enhanceAuthor = ({name, url}) => ({url, label: name})
const enhanceTag = tag => ({url: `/tags/${kebabCase(tag)}/`, label: tag})

const PageComponent = ({posts, tags, authors, editorials}) => (
	<div
		style={{
			background: colors.base,
			color: 'white',
			marginBottom: '-8rem',
			paddingBottom: '8rem',
		}}
	>
		<MetaTags title="Todos as matérias" />
		<Navbar style={{position: 'fixed', top: 0, zIndex: 3}} dark={true} />
		<main style={{padding: '8rem 0'}}>
			<Container>
				{/* [TODO]: sort tags and authors*/}
				<section style={{marginBottom: '6rem'}}>
					<Editorials editorials={editorials} style={{marginBottom: '2rem'}} />
					<ScrollList
						title="Repórteres"
						url="/reporteres"
						list={authors.map(enhanceAuthor)}
					/>
					<ScrollList title="Tags" url="/tags" list={tags.map(enhanceTag)} />
				</section>
				<section>
					<FixedTitle dark title="Todas as publicações" />
					<LayoutGrid>
						<Cell xs={12} lg={8} xg={8}>
							<CardRow>
								{posts.map(post => (
									<PostCard
										key={post.url}
										{...post}
										dark={!post.featured}
										alt={true}
										compact={true}
									/>
								))}
							</CardRow>
						</Cell>
					</LayoutGrid>
				</section>
			</Container>
		</main>
	</div>
)

const enhance = compose(
	withLayout,
	mapProps(
		({
			data: {
				blog: {posts = [], tags = []},
				allAuthors: {authors = []},
				allEditorials: {editorials = []},
			},
		}) => ({
			tags,
			editorials: editorials.map(get('editorial')).map(flattenEditorialInfo),
			authors: authors.map(get('author')).map(flattenAuthorInfo),
			posts: posts.map(get('post')).map(flattenBlogPostInfo),
		}),
	),
)

const BlogPage = enhance(PageComponent)

export default BlogPage

export const pageQuery = graphql`
	query BlogQuery {
		# [TODO]: filter author on current semester
		allAuthors: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___title]}
			filter: {frontmatter: {template: {eq: "author"}}}
		) {
			authors: edges {
				author: node {
					...AuthorInfo
				}
			}
		}

		# [TODO]: filter editorial on current semester
		allEditorials: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___title]}
			filter: {frontmatter: {template: {eq: "editorial"}}}
		) {
			editorials: edges {
				editorial: node {
					...EditorialInfo
				}
			}
		}

		# [TODO]: filter posts on current semester
		# [TODO]: add infinite-scrolling
		blog: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___date]}
			filter: {frontmatter: {template: {eq: "blog-post"}}}
		) {
			tags: distinct(field: frontmatter___tags)
			posts: edges {
				post: node {
					...BlogPostInfo
					...BlogPostCoverThumbnail
				}
			}
		}
	}
`
