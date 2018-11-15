import React from 'react'
import styled from 'styled-components/macro'
import {connect} from 'react-redux'
import {colors} from '../../constants'
import timesince from '../../utils/timesince'
import Separator from './Separator'
import Line from './Line'

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	border-top: 1px solid ${colors.base11}
`

// [TODO]: implement separators
const Table = ({groups = {}}) => (
	<Wrapper>
		{Object.keys(groups).map(title => (
			<React.Fragment key={title}>
				<Separator studentIds={groups[title]}>{title}</Separator>
				{groups[title].map(id => <Line key={id} id={id}/>)}
			</React.Fragment>
		))}
	</Wrapper>
)

const mapStateToProps = ({students}) => ({
	// this assumes allIds is ordered by descending date
	groups: students.allIds
		.reduce((obj, id) => {
			const {date} = students.byId[id] || {}
			if(!date) return obj
			const title = timesince()(date)
			return {...obj, [title]: [...(obj[title] || []), id]}
		}, {})
})

const enhance = connect(mapStateToProps, null)

export default enhance(Table)
