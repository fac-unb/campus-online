import React from 'react'
import {parse as parseURL} from 'url'
import spriteURL from './sprite.svg'
const {pathname: sprite} = parseURL(spriteURL)

export const extract = id => id.replace(/^feather-/, '')
const getLinkHref = icon => `${sprite}#feather-${extract(icon)}`

const Icon = ({
	icon = 'circle',
	color = 'currentColor',
	size = 24,
	strokeWidth = 2,
	...props,
}) => (
	<svg
		fill='none'
		strokeLinecap='round'
		strokeLinejoin='round'
		width={size}
		height={size}
		stroke={color}
		strokeWidth={strokeWidth}
		{...props}
	>
		<use xlinkHref={getLinkHref(icon)}/>
	</svg>
)

export default Icon
export {sprite}
