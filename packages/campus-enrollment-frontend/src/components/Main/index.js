import React from 'react'
import styled from 'styled-components/macro'
import {connect} from 'react-redux'
import {compose, withStateHandlers} from 'recompose'
import {above} from '../../utils/responsive'
import {colors} from '../../constants'
import {Heading} from '../Text'
import Table from '../Table'
import BottomBar from '../BottomBar'
import InputLine from '../InputLine'
import DeleteModal from '../DeleteModal'
import EmptyState from '../EmptyState'
import Counter from '../Counter'

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

const TableWrapper = styled.div`
	background: ${colors.white};
	flex: 1;
	padding-bottom: 4.5rem;
	margin: 0 -1rem;
	display: flex;
	flex-direction: column;
	${above.md`
		margin: 0;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	`}
`

const LoadingText = styled.div`
	color: ${colors.base22};
	text-align: center;
	flex: 1;
	justify-content: center;
	display: flex;
	align-items: center;
	font-size: 3rem;
`

const Loading = () => <LoadingText>Carregando Alunos&hellip;</LoadingText>

const Main = ({
	hasEnrolledStudents, isLoading, isModalVisible, toggleModal,
}) => (
	<Wrapper>
		<TitleBar>
			<Heading color={colors.base88} size={5} weight={700}>Alunos</Heading>
			<Counter/>
		</TitleBar>
		<TableWrapper>
			<InputLine isLoading={isLoading}/>
			{isLoading ? <Loading/> : hasEnrolledStudents ? <Table/> : <EmptyState/>}
		</TableWrapper>
		<BottomBar onClickButton={toggleModal}/>
		<DeleteModal isVisible={isModalVisible} onChangeVisibility={toggleModal}/>
	</Wrapper>
)

const mapStateToProps = ({students: {allIds, byId, ...students}, netlify}) => ({
	isLoading: netlify.isLoading || students.isFetching,
	hasEnrolledStudents: !!allIds.find(id => byId[id].status === 'enrolled'),
})

const enhance = compose(
	withStateHandlers(
		{isModalVisible: false},
		{toggleModal: state => () => ({isModalVisible: !state.isModalVisible})},
	),
	connect(mapStateToProps, null),
)

export default enhance(Main)
