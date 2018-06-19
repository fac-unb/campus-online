import React from 'react'
import MetaTags from '../../components/MetaTags'
import Container from '../../components/Container'
import Hero from '../../components/Hero'

const Author = ({name, semester, avatar, content}) => (
	<section>
		<MetaTags title={name} image={avatar} />
		<Hero
			title={name}
			sub={semester}
			author={{name, avatar}}
			bodyText={content}
		/>
		<Container />
	</section>
)

export default Author
