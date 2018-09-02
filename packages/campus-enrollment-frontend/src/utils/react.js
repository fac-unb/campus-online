import React from 'react'
import getDisplayName from 'react-display-name'

const wrapName = (prefix, component) => (
	`${prefix}(${getDisplayName(component)})`
)

export const defaultTag = fallback => {
	const Wrapper = ({tagName, component, ...props}) => {
		const Component = tagName || component || fallback
		return <Component {...props}/>
	}
	Wrapper.displayName = wrapName('defaultTag', fallback)
	return Wrapper
}
