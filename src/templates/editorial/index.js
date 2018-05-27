import React from 'react'
import PropTypes from 'prop-types'

// [TODO]: move markup to this file, from ./gatsby.js
// i've ported the earlier structure, it's probably wrong though,
// most styling and structure should be inside this file,
// and general page layout must be inside a layout, in layouts folder
// https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#choosing-the-page-layout

export const Editorial = ({name, semester, color}) => (
	<section style={{color: color}}>
		<h1>{name}</h1>
		<p>{semester}</p>
	</section>
)

Editorial.propTypes = {
	name: PropTypes.string,
	semester: PropTypes.string,
}

export default Editorial
