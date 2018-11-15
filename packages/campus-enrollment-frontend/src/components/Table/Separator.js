import React from 'react'
import styled from 'styled-components/macro'
import {connect} from 'react-redux'
import {colors} from '../../constants'
import {select, unselect} from '../../reducers/students'
import Checkbox from '../Checkbox'

const Wrapper = styled.div`
	user-select: none;
	background: ${colors.base06};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	box-shadow: 0 1px 0 0 ${colors.base11}, 0 -1px 0 0 ${colors.base11};
	position: sticky;
	top: 0;
	${p => !p.disabled && `
		cursor: pointer;
	`}
`

const Left = styled.div`
	display: flex;
	align-items: center;
`

const Title = styled.div`
	font-size: 0.75rem;
	font-weight: 600;
	letter-spacing: 0.025rem;
	text-transform: uppercase;
	color: ${colors.base66};
	margin-left: 0.5rem;
`

const Counter = styled.div`
	background: ${colors.white};
	font-size: 0.625rem;
	letter-spacing: 0.025rem;
	font-weight: 700;
	color: ${colors.base66};
	padding: 0.125rem 0.375rem;
	border-radius: 0.125rem
`

const Separator = ({children, counter, checked, toggle}) => (
	<Wrapper onClick={toggle}>
		<Left>
			<Checkbox checked={checked}/>
			<Title>{children}</Title>
		</Left>
		{counter && <Counter>{counter}</Counter>}
	</Wrapper>
)

const mapStateToProps = ({students: {selectedIds}}, {studentIds}) => {
	const selectedCount = studentIds.filter(id => selectedIds.includes(id)).length
	return {
		counter: selectedCount ? `${selectedCount}/${studentIds.length}` : null,
		checked: selectedCount === studentIds.length,
	}
}

const mapDispatchToProps = {select, unselect}

const mergeProps = ({counter, checked}, {select, unselect}, props) => ({
	children: props.children, counter, checked,
	toggle: () => (checked ? unselect : select)(props.studentIds),
})

const enhance = connect(mapStateToProps, mapDispatchToProps, mergeProps)

export default enhance(Separator)
