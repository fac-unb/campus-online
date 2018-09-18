import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'
import {withLayout} from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Container from '../../components/Container'
import Text from '../../components/Text'
import UnstyledMap from '../../components/Map'
import UnstyledLink from '../../components/StylableLink'
import meta from './index.json'

const Wrapper = styled.div`
	background: ${colors.base03};
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	min-height: 100vh;
`

const MapWrapper = styled.div`
	position: absolute;
	top: 0;
	flex: 1;
`

const Map = styled(UnstyledMap)`
	margin-top: 0;
	width: 100vw;
	height: 100vh;
	opacity: 0.44;
`

const Main = styled.div`
	display: inline-block;
	display: inline-flex;
	flex-direction: column;
	margin: 4rem 0;
	padding: 1rem 2rem 1rem 0;
	z-index: 3;
	position: relative;
	background: ${colors.base};
	color: ${colors.base03};
	${above.md`
		padding: 2rem 4rem 2rem 0;
	`} :before {
		content: '';
		position: absolute;
		background: ${colors.base};
		top: 0;
		width: 100%;
		width: 50vw;
		right: 100%;
		height: 100%;
	}
`

const Link = styled(UnstyledLink)`
	display: block;
	color: ${colors.base44};
	text-decoration: none;
	line-height: 1;
	padding: 0.25em 0;
	${above.md`
		font-size: 1.25rem;
	`} :hover {
		color: ${colors.white};
	}
`

const SuccessPage = () => (
	<Wrapper>
		<Navbar style={{position: 'fixed', top: 0, zIndex: 3}} dark={true} />
		<MapWrapper>
			{meta.lat &&
				meta.long && (
					<Map coordinates={[meta.lat, meta.long]} zoom={[12, 16]} />
				)}
		</MapWrapper>
		<Container>
			<Main>
				<div>
					{/* <Icon icon="message-square" size={48} strokeWidth={0.875} /> */}
				</div>
				<Text style={{margin: '0'}}><h1>Mensagem enviada com sucesso!</h1></Text>
				<Link to="/">Voltar para Home</Link>
			</Main>
		</Container>
	</Wrapper>
)

export default withLayout(SuccessPage)
