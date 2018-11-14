import React from 'react'
import styled from 'styled-components/macro'
import {connect} from 'react-redux'
import {colors} from '../../constants'
import {invite} from '../../reducers/students'
import BaseIcon from '../Icon'
import Input from '../Input'
import BaseButton from '../Button'

const Wrapper = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.75rem;
`

const Main = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
`

const Icon = styled(BaseIcon)`margin-left: 0.25rem; margin-right: 0.75rem;`
const AddButton = styled(BaseButton)`min-width: 7.5rem;`

const InputLine = ({invite}) => (
	<Wrapper onSubmit={invite}>
		<Icon icon='user-plus' size={16} color={colors.base66}/>
		<Main>
			<Input name='name' placeholder='Nome' style={{fontWeight: 600}} required/>
			<Input name='email' type='email' placeholder='Email' required/>
			<AddButton type='submit' icon='corner-down-left'>Adicionar</AddButton>
		</Main>
	</Wrapper>
)

const mapDispatchToProps = dispatch => ({
	invite: event => {
		event.preventDefault()
		event.stopPropagation()
		const {name = {}, email = {}} = event.target

		dispatch(invite({
			name: name.value || null,
			email: email.value || null,
		}))

		event.target.reset()
		event.target.name.focus()
	},
})

const enhance = connect(null, mapDispatchToProps)

export default enhance(InputLine)
