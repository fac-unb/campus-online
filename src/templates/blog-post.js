import React from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, {HTMLContent} from '../components/Content'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import HomeHero from '../components/HomeHero'
import Text from '../components/Text'

export const BlogPostTemplate = ({
	content,
	contentComponent,
	tags,
	date,
	cover,
	author,
	editorial,
	title,
	helmet,
	id,
}) => {
	const PostContent = contentComponent || Content

	return (
		<article>
			{helmet || ''}
			<Navbar
				style={{position: 'fixed', top: 0, zIndex: 2}}
				links={[
					{href: '/about', label: 'Sobre'},
					{href: '/contact', label: 'Contato'},
				]}
			/>
			<HomeHero
				title={title}
				date={date}
				key={id}
				cover={cover}
				editorial={editorial}
			/>
			<Container>
				<Text>
					<PostContent content={content} />
				</Text>
				{tags && tags.length ? (
					<div>
						<h4>Tags</h4>
						<ul>
							{tags.map(tag => (
								<li key={tag + `tag`}>
									<Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
								</li>
							))}
						</ul>
					</div>
				) : null}
			</Container>
		</article>
	)
}

const BlogPost = ({data}) => {
	const {markdownRemark: post} = data

	return (
		<BlogPostTemplate
			helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
			content={post.html}
			contentComponent={HTMLContent}
			date={post.frontmatter.date}
			editorial={post.frontmatter.editorial}
			cover={post.frontmatter.cover}
			tags={post.frontmatter.tags}
			title={post.frontmatter.title}
		/>
	)
}

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
}

export default BlogPost

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: {eq: $id}) {
			id
			html
			frontmatter {
				date
				title
				cover
				editorial
				author
				tags
			}
		}
	}
`
