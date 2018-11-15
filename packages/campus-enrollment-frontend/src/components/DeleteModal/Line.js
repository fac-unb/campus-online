import React from 'react'
import styled from 'styled-components/macro'
import {connect} from 'react-redux'
import {colors} from '../../constants'

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 1rem;
	padding: 0.5rem 1.25rem;
	line-height: 1.5rem;
`

const Name = styled.div`
	color: ${colors.base88};
	font-weight: 600;
`

const Email = styled.div`
	color: ${colors.base66};
`

const DeleteLine = ({name, email}) => (
	<Wrapper>
		<Name>{name}</Name>
		<Email>{email}</Email>
	</Wrapper>
)

const mapStateToProps = ({students}, {id}) => ({
	...students.byId[id],
	selected: students.selectedIds.includes(id),
})

const enhace = connect(mapStateToProps, null)

export default enhace(DeleteLine)
