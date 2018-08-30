import React from 'react'
import styled from 'styled-components'
import {mapProps} from 'recompose'
import GatsbyImage from 'gatsby-image'
import {above} from '../../utils/responsive'
import {maxHeight} from '.'

const outerWrapper = mapProps(({className, ...props}) => ({
	...props,
	outerWrapperClassName: className,
	style: {position: 'absolute'},
}))

const Inner = styled(GatsbyImage)`
	display: block;
	object-fit: cover;
	height: 100%;
	min-width: 100%;
	max-height: ${maxHeight};
	flex: 1;
	background: ${p => (p.dark ? '#101112' : '#e5e5e5')};
	${above.md`
		min-height: 100%;
		position: absolute !important;
	`} & img[src^='data:'] {
		filter: blur(1rem) grayscale(25%);
		transform: scale(1.025);
		background: #f0f;
	}
`

const Outer = styled(outerWrapper(Inner))`
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	position: absolute !important;
`

const Image = ({image, position = 'absolute', dark}) => (
	<Outer {...image} dark={dark} style={{position}} position={position} />
)

export default Image
