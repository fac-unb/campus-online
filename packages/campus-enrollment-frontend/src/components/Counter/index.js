import styled from 'styled-components'
import {connect} from 'react-redux'
import {colors} from '../../constants'

const Counter = styled.div`
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1rem;
	padding: 0.5rem 0.75rem;
	color: ${colors.white};
	background: ${colors.base66};
	border-radius: 0.25rem;
	margin-left: 0.5rem;
	display: ${p => p.children > 0 ? 'block' : 'none'};
`

const mapStateToProps = ({students}) => ({children: students.allIds.length})

const enhance = connect(mapStateToProps, null)

export default enhance(Counter)
