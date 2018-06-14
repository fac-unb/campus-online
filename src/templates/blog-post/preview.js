import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import {mapProps} from 'recompose'
import Template from '.'

const enhance = mapProps(({entry, widgetFor}) => {
	// eslint-disable-next-line no-unused-vars
	const {body, ...data} = entry.getIn(['data']).toJS()
	return {
		...data,
		author: fp.get('author.title')(data),
		content: widgetFor('body'),
		siteTitle: 'Campus CMS',
	}
})

const Preview = enhance(Template)

Preview.propTypes = {
	entry: PropTypes.shape({getIn: PropTypes.func}),
	widgetFor: PropTypes.func,
}

export default Preview
