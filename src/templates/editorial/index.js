import React, {Fragment} from 'react'
import MetaTags from '../../components/MetaTags'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import PostCard from '../../components/PostCard'

export const Editorial = ({title, color, content, posts}) => (
	<Fragment>
		<MetaTags title={title} />
		<Hero title={title} background={color} navbar={false} bodyText={content} />
		<Navbar
			background={color}
			dark={true}
			style={{position: 'fixed', top: 0, zIndex: 3}}
		/>
		<Container style={{paddingTop: '6rem', paddingBottom: '8rem'}}>
			{posts.map(post => <PostCard {...post} key={post.url} />)}
		</Container>
	</Fragment>
)

export default Editorial
