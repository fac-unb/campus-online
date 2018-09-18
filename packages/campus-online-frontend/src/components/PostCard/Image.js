import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'
import {above} from '../../utils/responsive'
import {maxHeight} from './constants'

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

const Image = ({image, position = 'absolute', dark}) => (
	<Inner {...image} dark={dark} style={{position}} position={position} />
)

export default Image
