import React from 'react'
import PropTypes from 'prop-types'
import MetaTags from '../../components/MetaTags'
import Container from '../../components/Container'
import Hero from '../../components/Hero'

// [TODO]: move markup to this file, from ./gatsby.js
// i've ported the earlier structure, it's probably wrong though,
// most styling and structure should be inside this file,
// and general page layout must be inside a layout, in layouts folder
// https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#choosing-the-page-layout

const Author = ({name, semester, avatar, content}) => (
	<section>
		<MetaTags title={name} authorName={name} image={avatar} />
		<Hero
			title={name}
			sub={semester}
			author={{name, avatar}}
			bodyText={content}
		/>
		<Container>
			[TODO]: map articles here & add counter after semester on hero
		</Container>
	</section>
)

Author.propTypes = {
	content: PropTypes.string.isRequired,
	name: PropTypes.string,
	semester: PropTypes.string,
}

export default Author
