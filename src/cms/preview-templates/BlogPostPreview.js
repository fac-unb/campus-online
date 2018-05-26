import React from 'react'
import PropTypes from 'prop-types'
import {BlogPostTemplate} from '../../templates/blog-post'
import Content from '../../components/Content'
import withStyleSheet from '../withStyleSheet'

const BlogPostPreview = ({entry, widgetFor}) => (
	<BlogPostTemplate
		content={widgetFor('body')}
		description={entry.getIn(['data', 'description'])}
		tags={entry.getIn(['data', 'tags']).toJS()}
		title={entry.getIn(['data', 'title'])}
		author={entry.getIn(['data', 'author'])}
		cover={entry.getIn(['data', 'cover'])}
		date={entry.getIn(['data', 'date'])}
		editorial={entry.getIn(['data', 'editorial'])}
	/>
)

BlogPostPreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default withStyleSheet(BlogPostPreview)
