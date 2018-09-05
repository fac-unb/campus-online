import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'
import {toggle} from '../../reducers/students'
import BaseCheckbox from '../Checkbox'

const Wrapper = styled.div`
	line-height: 1.5rem;
	border-bottom: 1px solid ${colors.base11};
	display: flex;
	align-items: center;
	${p => !p.disabled && `
		cursor: pointer;
		&:hover {
			background-color: ${colors.base03};
		}
	`}
`

const Checkbox = styled(BaseCheckbox)`
	margin-left: 1rem;
	margin-right: 0.25rem;
`

const Flex = styled.div`
	padding: 0.75rem;
	${above.md`
		padding: 1rem 0.75rem;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	`}
`

const Name = styled.div`
	font-weight: 600;
	${above.md`flex: 1 0;`}
`

const Mail = styled.div`
	color: ${colors.base88};
	${above.md`flex: 1 0;`}
`

const When = styled.div`
	font-size: 0.875rem;
	font-weight: 500;
	color: ${colors.base44};
	${above.md`
		flex: 0 0;
		text-align: right;
		min-width: 7.5rem;
	`}
`

const Line = ({name, email, date, selected, loading, toggle}) => (
	<Wrapper disabled={loading} onClick={toggle}>
		<Checkbox checked={selected}/>
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
