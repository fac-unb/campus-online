import React from 'react'
import PropTypes from 'prop-types'
import Content from '../../components/Content'

// [TODO]: move markup to this file, from ./gatsby.js
// i've ported the earlier structure, it's probably wrong though,
// most styling and structure should be inside this file,
// and general page layout must be inside a layout, in layouts folder
// https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#choosing-the-page-layout

const Author = ({name, semester, content}) => (
	<section>
		<h1>{name}</h1>
		<p>{semester}</p>
		<Content>{content}</Content>
	</section>
)

Author.propTypes = {
	content: PropTypes.string.isRequired,
	name: PropTypes.string,
	semester: PropTypes.string,
}

export default Author
