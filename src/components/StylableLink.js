import React from 'react'
import Link from 'gatsby-link'

const StylableLink = ({to, children, className, style}) => (
	// this component filters unwanted props
	<Link to={to} className={className} style={style} children={children} />
)

export default StylableLink
