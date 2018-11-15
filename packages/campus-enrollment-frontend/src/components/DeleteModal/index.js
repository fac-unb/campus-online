import React from 'react'
import styled from 'styled-components/macro'
import {connect} from 'react-redux'
import {colors} from '../../constants'
import {retire} from '../../reducers/students'
import {Heading} from '../Text'
import Modal from '../Modal'
import Button from '../Button'
import Line from './Line'

const Wrapper = styled.div`
	width: calc(100vw - 2rem);
	max-width: 32rem;
`

const Title = styled(Heading)`
	padding: 0.75em 0.875em;
	background: ${colors.base03};
`

const List = styled.div`
	padding: 1rem 0;
`

const Bottom = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 0.5rem;
`

const Cancel = styled(Button)`
	padding: 0.75rem 1rem;
	border-radius: 0;
	border: 0;
	background: ${colors.white}
	color: ${colors.base44};
	:hover, :focus{
		background: ${colors.white};
		color: ${colors.base88};
	}
`

const Confirm = styled(Button)`
	padding: 0.75rem 1rem;
	border-radius: 0;
	border-top-left-radius: 0.25rem;
	border: 0;
	color: ${colors.white};
	background: ${colors.danger};
	:hover, :focus{
		background: ${colors.danger};
	}
`

const DeleteModal = ({selectedIds = [], retireSelected, ...props}) => (
	<Modal style={{overflow: 'hidden'}} {...props}>
		<Wrapper>
			<Title size={3} weight={600}>Deseja remover os seguintes alunos?</Title>
			<List>
				{selectedIds.map(id => <Line key={id} id={id}/>)}
			</List>
			<Bottom>
				<Cancel onClick={props.onChangeVisibility}>Cancelar</Cancel>
				<Confirm icon='trash-2' onClick={retireSelected}>Remover</Confirm>
			</Bottom>
		</Wrapper>
	</Modal>
)

const mapStateToProps = ({students}) => ({selectedIds: students.selectedIds})
const mapDispatchToProps = {retire}
const mergeProps = ({selectedIds}, {retire}, props) => ({...props, selectedIds,
	retireSelected: () => {
		retire(selectedIds)
		props.onChangeVisibility(false)
	},
})

const enhance = connect(mapStateToProps, mapDispatchToProps, mergeProps)

export default enhance(DeleteModal)
