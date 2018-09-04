import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'
import {toggle} from '../../reducers/students'
import Checkbox from '../Checkbox'

const Wrapper = styled.div`
	line-height: 1.5rem;
	border-bottom: 1px solid ${colors.base11};
	display: flex;
	align-items: center;
	padding: 0 0.5rem;
	${p => !p.disabled && `
		cursor: pointer;
		&:hover {
			background-color: ${colors.base03};
		}
	`}
`

const Flex = styled.div`
	padding: 0.5rem;
	${above.md`
		padding: 0;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	`}
`

const Name = styled.div`
	font-weight: 600;
	${above.md`padding: 1rem 0.5rem;`}
`

const Mail = styled.div`
	color: ${colors.base88};
	${above.md`padding: 1rem 0.5rem;`}
`

const When = styled.div`
	font-size: 0.875rem;
	font-weight: 500;
	color: ${colors.base44};
	${above.md`padding: 1rem 0.5rem;`}
`

const Line = ({name, email, date, selected, toggle}) => (
	<Wrapper onClick={toggle}>
		<Checkbox checked={selected} style={{marginLeft: '0.5rem'}}/>
		<Flex>
			<Name>{name}</Name>
			<Mail>{email}</Mail>
			<When>{(new Date(date)).toLocaleDateString('pt-BR')}</When>
		</Flex>
	</Wrapper>
)

const mapStateToProps = ({students}, {id}) => ({
	...students.byId[id],
	selected: students.selectedIds.includes(id),
})

const mapDispatchToProps = (dispatch, {id}) => ({
	toggle: () => dispatch(toggle(id)),
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(Line)
