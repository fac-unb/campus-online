import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

const Wrapper = styled(GatsbyImage)`
	display: block;
	object-fit: cover;
	height: 100%;
	min-width: 100%;
`

const Image = ({image, className, position = 'relative'}) => (
	<Wrapper {...image} outerWrapperClassName={className} style={{position}} />
)

export default Image
