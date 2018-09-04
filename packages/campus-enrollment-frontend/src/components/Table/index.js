import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {colors} from '../../constants'
// import Separator from './Separator'
import Line from './Line'

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	border-top: 1px solid ${colors.base11}
`

// [TODO]: implement separators
const Table = ({studentIds = []}) => (
	<Wrapper>
		{studentIds.map(id => <Line key={id} id={id}/>)}
	</Wrapper>
)

const mapStateToProps = ({students}) => ({studentIds: students.allIds})
const enhance = connect(mapStateToProps, null)

export default enhance(Table)
