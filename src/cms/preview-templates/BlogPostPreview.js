import React from 'react'
import PropTypes from 'prop-types'
import {BlogPostTemplate} from '../../templates/blog-post'
import withStyleSheet from '../withStyleSheet'

const BlogPostPreview = ({entry, widgetFor}) => (
	<BlogPostTemplate
		content={widgetFor('body')}
		description={entry.getIn(['data', 'description'])}
		tags={entry.getIn(['data', 'tags'])}
		title={entry.getIn(['data', 'title'])}
	/>
)

BlogPostPreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default withStyleSheet(BlogPostPreview)
