import React from 'react'
import styled from 'styled-components/macro'
import {connect} from 'react-redux'
import {colors} from '../../constants'
import Icon from '../Icon'

const Wrapper = styled.div`
	flex: 1;
	position: absolute;
	width: 100%;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
`

const Main = styled.div`
	position: fixed;
	bottom: 0;
	padding: 0 2rem;
	max-width: 44rem;
	margin-top: 4rem;
	display: flex;
	flex: 1;
	align-items: stretch;
	color: ${colors.white};
	width: 100%;
	transition: 0.3s all;
	transform: ${p => p.visible ? 'none' : 'translateY(100%)'};
`

const Left = styled.div`
	background: ${colors.base};
	display: flex;
	align-items: center;
	flex: 1;
	border-top-left-radius: 0.375rem;
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
	border-top-right-radius: 0.375rem;
	:hover{
		${ButtonText}{
			display: block;
		}
	}
`

const BottomBar = ({selectedStudentCount, onClickButton}) => (
	<Wrapper>
		<Main visible={!!selectedStudentCount}>
			<Left>
				<Counter>{selectedStudentCount || 1}</Counter>
				<Title>
					{selectedStudentCount > 1
						? 'Alunos selecionados'
						: 'Aluno selecionado'
					}
				</Title>
			</Left>
			<Button onClick={onClickButton}>
				<Icon size={18} strokeWidth={1.875} icon='trash-2'/>
				<ButtonText>Remover</ButtonText>
			</Button>
		</Main>
	</Wrapper>
)

const mapStateToProps = ({students}) => ({
	selectedStudentCount: students.selectedIds.length,
})

const enhance = connect(mapStateToProps, null)

export default enhance(BottomBar)
