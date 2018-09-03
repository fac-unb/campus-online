import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import Icon from '../Icon'

const Wrapper = styled.div`
	flex: 1;
	position: absolute;
	width: 100%;
	bottom: 0;
	display: flex;
	padding: 0 1rem;
	align-items: center;
	justify-content: center;
	user-select: none;
	transition: 0.3s all;
	${p => !p.visible && `transform: translateY(100%);`}
`

const Main = styled.div`
	max-width: 42rem;
	margin-top: 4rem;
	display: flex;
	flex: 1;
	align-items: stretch;
	color: ${colors.white};
	width: 100%;
	overflow: hidden;
	border-top-left-radius: 0.375rem;
	border-top-right-radius: 0.375rem;
`

const Left = styled.div`
	background: ${colors.base};
	display: flex;
	align-items: center;
	flex: 1;
`

const Counter = styled.div`
	font-size: 0.75rem;
	font-weight: 800;
	line-height: 1rem;
	padding: 0.25rem 0.5rem;
	color: ${colors.base};
	background: ${colors.white};
	border-radius: 0.125rem;
	margin: 0.75rem 0.5rem 0.75rem 0.75rem;
`

const Title = styled.div`
	font-size: 0.75rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.025rem;
`

const ButtonText = styled(Title)`
	margin-left: 0.5rem;
	display: none;
`

const Button = styled.div`
	background: ${colors.danger};
	display: flex;
	align-items: center;
	padding: 0.75rem;
	cursor: pointer;
	:hover{
		${ButtonText}{
			display: block;
		}
	}
`

const BottomBar = ({students}) => (
	<Wrapper visible={(students.length > 0)}>
		<Main>
			<Left>
				<Counter>{students.length}</Counter>
				<Title>Alunos selecionados</Title>
			</Left>
			<Button>
				<Icon size={18} strokeWidth={1.875} icon='trash-2'/>
				<ButtonText>Remover</ButtonText>
			</Button>
		</Main>
	</Wrapper>
)

BottomBar.defaultProps = {
	students: [
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
	]
}

export default BottomBar
