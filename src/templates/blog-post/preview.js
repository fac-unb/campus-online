import PropTypes from 'prop-types'
import {mapProps} from 'recompose'
import BlogPost from '.'

const expand = data =>
	((data || {}).slug || null) && {
		url: data.slug,
		title: data.title,
	}

const enhance = mapProps(({entry, widgetFor}) => {
	// eslint-disable-next-line no-unused-vars
	const {body, ...data} = entry.getIn(['data']).toJS()
	return {
		...data,
		author: expand(data.author),
		editorial: expand(data.editorial),
		content: widgetFor('body'),
		siteTitle: 'CMS',
	}
})

const Preview = enhance(BlogPost)

Preview.propTypes = {
	entry: PropTypes.shape({getIn: PropTypes.func}),
	widgetFor: PropTypes.func,
}

export default Preview
