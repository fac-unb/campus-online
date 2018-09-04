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
import EmptyState from '../EmptyState'

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
	padding-bottom: 4.5rem;
	margin: 0 -1rem;
	${above.md`
		margin: 0;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	`}
`

const Main = ({students, isModalVisible, toggleModal}) => (
	<Wrapper>
		<TitleBar>
			<Heading color={colors.base88} size={5} weight={500}>Alunos</Heading>
			<Counter>{students.length}</Counter>
		</TitleBar>
		<TableWrapper>
			<InputLine/>
			{students.length > 0
				? <Table students={students}/>
				: <EmptyState/>
			}
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
		{name: 'Vitor Dino1', mail: 'vitor@dino1.com', date: '12/12/2017'},
		{name: 'Vitor Dino2', mail: 'vitor@dino2.com', date: '12/12/2017'},
		{name: 'Vitor Dino3', mail: 'vitor@dino3.com', date: '12/12/2017'},
	]
}

const enhance = withStateHandlers(
	{isModalVisible: false},
	{toggleModal: ({isModalVisible}) => () => ({isModalVisible: !isModalVisible})},
)

export default enhance(Main)
