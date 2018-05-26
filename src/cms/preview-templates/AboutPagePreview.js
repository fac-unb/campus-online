import React from 'react'
import PropTypes from 'prop-types'
import {AboutPageTemplate} from '../../templates/about-page'
import withStyleSheet from '../withStyleSheet'

const AboutPagePreview = ({entry, widgetFor}) => (
	<AboutPageTemplate
		title={entry.getIn(['data', 'title'])}
		content={widgetFor('body')}
	/>
)

AboutPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default withStyleSheet(AboutPagePreview)
