import React from 'react'
import Link from 'gatsby-link'

const StylableLink = ({to, children, className, style}) => {
	const href = (to || {}).pathname || (typeof to === 'string' ? to : '/')
	const external = /^[^./]/.test(href)
	const allowedProps = {className, style, children}
	return external ? (
		<a {...allowedProps} href={href} />
	) : (
		<Link {...allowedProps} to={to} />
	)
}

export default StylableLink
