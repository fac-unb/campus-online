import styled from 'styled-components/macro'
import {connect} from 'react-redux'
import {colors} from '../../constants'

const Counter = styled.div`
	user-select: none;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1rem;
	padding: 0.25rem 0.5rem;
	color: ${colors.white};
	background: ${colors.base88};
	border-radius: 0.25rem;
	margin-left: 0.5rem;
	margin-top: 0.5rem;
	display: ${p => p.children > 0 ? 'block' : 'none'};
`

const mapStateToProps = ({students}) => ({children: students.allIds.length})

const enhance = connect(mapStateToProps, null)

export default enhance(Counter)
