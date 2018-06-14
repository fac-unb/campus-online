import React, {forwardRef} from 'react'
import CMS from 'netlify-cms'

const Relation = CMS.getWidget('relation')

function isValid() {
	const {value, field} = this.props
	const required = field.get('required')
	const error = {
		type: 'CUSTOM',
		error: true,
		message: field.get('error') || 'precisa ser um semestre válido',
	}

	if (typeof value !== 'string') return error
	if (!required && !value) return true
	if (value.length !== 6) return error
	if (!/^\d{4}\/\d$/.test(value)) return error
	return true
}

const methods = {
	isValid,
	shouldRenderSuggestions: () => false,
}

const SemesterControl = forwardRef((props, ref) => (
	<Relation.control ref={ref} {...props} {...methods} />
))

export default SemesterControl
