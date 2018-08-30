import React from 'react'
import {colors} from '../../constants'
import Container from '../Container'
import MediaQuery from '../MediaQuery'
import Canvas from './Canvas'
import Letters from './Letters'

const Wrapper = ({children, background}) => (
	<MediaQuery above="md">
		{desktop =>
			desktop ? <Canvas background={background}>{children}</Canvas> : children
		}
	</MediaQuery>
)

const AboutHero = ({style, background}) => (
	<Wrapper background={background}>
		<Container style={style}>
			<Letters />
		</Container>
	</Wrapper>
)

AboutHero.defaultProps = {background: colors.base03}
export default AboutHero
