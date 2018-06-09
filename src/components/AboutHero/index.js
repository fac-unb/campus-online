import React from 'react'
import styled from 'styled-components'
import {above} from '../../utils/responsive'
// import {colors} from '../../constants'
import Container from '../Container'
import Canvas from './Canvas'
import Letters from './Letters'

const Wrapper = styled.div`
	position: relative;
`

const CanvasWrapper = styled.div`
	overflow: hidden;
	position: relative;
	background: white;
	right: 0;
	left: 0;
	${above.md`
		margin-right: calc(-50vw + 50%);
	`};
`

const AboutHero = () => (
	<Wrapper>
		<Container style={{position: 'relative'}}>
			<CanvasWrapper>
				<Canvas />
				<Letters />
			</CanvasWrapper>
		</Container>
	</Wrapper>
)

export default AboutHero
