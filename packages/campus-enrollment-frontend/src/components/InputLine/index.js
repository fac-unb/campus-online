import React from 'react'
import styled from 'styled-components'
// import {above} from '../../utils/responsive'
import {colors} from '../../constants'
import Icon from '../Icon'
import Input from '../Input'
import Button from '../Button'

const Wrapper = styled.form`
	display: flex;
	align-items: center;
	padding: 1rem 0;
`

const Main = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
`

const InputLine = () => (
	<Wrapper>
		<Icon
			icon='user-plus'
			size={16}
			color={colors.base66}
			style={{margin: '0.5rem'}}
		/>
		<Main>
			<Input
				name='name'
				type='text'
				placeholder='Nome'
				style={{fontWeight: 600}}
			/>
			<Input
				name='mail'
				type='email'
				placeholder='Email'
			/>
			<Button icon='corner-down-left'>Adicionar</Button>
		</Main>
	</Wrapper>
)

export default InputLine
