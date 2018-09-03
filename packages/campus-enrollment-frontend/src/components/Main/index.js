import React from 'react'
import styled from 'styled-components'
import {above} from '../../utils/responsive'
import {colors} from '../../constants'
import {Heading} from '../Text'
import Table from '../Table'
import BottomBar from '../BottomBar'

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
	overflow: hidden;
	padding-bottom: 4.5rem;
	${above.md`padding: 2rem 2rem 5rem;`}
`

const Main = ({students}) => (
	<Wrapper>
		<TitleBar>
			<Heading color={colors.base88} size={5} weight={500}>Alunos</Heading>
			<Counter>{students.length}</Counter>
		</TitleBar>
		<TableWrapper>
			<Table students={students}/>
		</TableWrapper>
		<BottomBar/>
	</Wrapper>
)

Main.defaultProps = {
	students: [
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
		{name: 'Vitor Dino', mail: 'vitor@dino.com', date: '12/12/2017'},
	]
}

export default Main
