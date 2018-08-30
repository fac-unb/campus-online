import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

const ImageWrapper = styled(GatsbyImage)`
	height: 100%;
	min-width: 100%;
	background: #e5e5e5;
	& img[src^='data:'] {
		filter: blur(1rem) grayscale(25%);
		transform: scale(1.025);
		background: #f0f;
	}
`

const Image = ({image, className, position = 'relative'}) => (
	<ImageWrapper
		{...image}
		outerWrapperClassName={className}
		style={{position}}
		position={position}
	/>
)

export default Image
