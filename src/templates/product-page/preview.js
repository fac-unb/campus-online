import React from 'react'
import PropTypes from 'prop-types'
import Template from '.'

const Preview = ({entry}) => <Template {...entry.getIn(['data']).toJS()} />

Preview.propTypes = {
	entry: PropTypes.shape({getIn: PropTypes.func}),
}

export default Preview
