import React from 'react'
import styled from 'styled-components'
import {withStateHandlers} from 'recompose'
import {above} from '../../utils/responsive'
import {colors} from '../../constants'
import {Heading} from '../Text'
import Table from '../Table'
import BottomBar from '../BottomBar'
import InputLine from '../InputLine'
import DeleteModal from '../DeleteModal'

const Wrapper = styled.div`
	margin-top: 4rem;
	display: flex;
	flex-direction: column;
	flex: 1;
	position: relative;
`

const TitleBar = styled.div`
	display: flex;
	align-items: center;
	margin: 1rem 0;
`

const Counter = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1rem;
	padding: 0.5rem 0.75rem;
	color: ${colors.white};
	background: ${colors.base66};
	border-radius: 0.25rem;
	margin-left: 0.5rem;
`

const TableWrapper = styled.div`
	background: ${colors.white};
	flex: 1;
	border-top-left-radius: 0.25rem;
	border-top-right-radius: 0.25rem;
	padding-bottom: 4.5rem;
	${above.md`padding: 1rem 2rem 5rem;`}
`

const Main = ({students, isModalVisible, toggleModal}) => (
	<Wrapper>
		<TitleBar>
			<Heading color={colors.base88} size={5} weight={500}>Alunos</Heading>
			<Counter>{students.length}</Counter>
		</TitleBar>
		<TableWrapper>
			<InputLine/>
			<Table students={students}/>
		</TableWrapper>
		<BottomBar onClickButton={toggleModal}/>
		<DeleteModal
			students={students}
			isVisible={isModalVisible}
			onChangeVisibility={toggleModal}
		/>
	</Wrapper>
)

Main.defaultProps = {
	students: [
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
	]
}

const enhance = withStateHandlers(
	{isModalVisible: false},
	{toggleModal: ({isModalVisible}) => () => ({isModalVisible: !isModalVisible})},
)

export default enhance(Main)
