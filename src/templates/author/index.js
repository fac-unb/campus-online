import React, {Fragment} from 'react'
import MetaTags from '../../components/MetaTags'
import Container from '../../components/Container'
import Hero from '../../components/Hero'
import PostCard from '../../components/PostCard'

const Author = ({name, semester, avatar, content, excerpt, posts}) => (
	<Fragment>
		<MetaTags title={name} image={avatar} description={excerpt} />
		<Hero
			title={name}
			sub={semester}
			author={{name, avatar}}
			bodyText={content}
		/>
		<Container style={{paddingTop: '6rem', paddingBottom: '8rem'}}>
			{posts.map(post => (
				<PostCard {...post} key={post.url} author={null} />
			))}
		</Container>
	</Fragment>
)

export default Author
