import React, {Fragment} from 'react'
import Helmet from 'react-helmet'
import Content from '../../components/Content'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import Navbar from '../../components/Navbar'
import HomeHero from '../../components/HomeHero'
import Text from '../../components/Text'
import Tags from '../../components/Tags'
import AuthorCard from '../../components/AuthorCard'
import SideSection from '../../components/SideSection'

const BlogPost = ({
	content,
	tags,
	date,
	cover,
	editorial,
	title,
	author,
	siteTitle,
}) => {
	return (
		<main style={{paddingBottom: '8rem'}}>
			<Helmet>
				<title>
					{siteTitle} | {title}
				</title>
			</Helmet>
			<Navbar style={{position: 'fixed', top: 0, zIndex: 2}} />
			<HomeHero title={title} date={date} cover={cover} editorial={editorial} />
			<Container>
				<Row>
					<Cell xs={12} lg={8}>
						<Text>
							<Content>{content}</Content>
						</Text>
					</Cell>
					<Cell xs={0} lg={1} />
					<Cell xs={12} lg={3} style={{position: 'sticky', top: '6rem'}}>
						<div style={{width: '100%'}}>
							{tags.length && (
								<Fragment>
									<SideSection title="Tags" to="/tags" count={tags} />
									<Tags tags={tags} style={{marginBottom: '3em'}} />
								</Fragment>
							)}
							{author && (
								<Fragment>
									<SideSection title="Autor" to="/authors" />
									<AuthorCard
										name={author.title}
										avatar={author.image}
										slug={author.url}
									/>
								</Fragment>
							)}
						</div>
					</Cell>
				</Row>
			</Container>
		</main>
	)
}

export default BlogPost
