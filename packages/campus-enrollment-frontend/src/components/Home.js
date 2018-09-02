import React, {Fragment} from 'react'
import {
	Container, Box, Badge, Heading, Flex, Button, ButtonOutline,
} from 'rebass'

import AuthState from './AuthState'

const AuthButton = ({render, children = render}) => (
	<AuthState
		render={({isLoggedIn, action}) => children({
			children: isLoggedIn ? 'logout' : 'log in',
			onClick: action, disabled: !action,
		})}
	/>
)

const Home = () => (
	<Fragment>
		<Box color='white' bg='blue'>
			<Container py={3}>
				<Flex
					justifyContent='space-between'
					alignItems='center'
					flexWrap='wrap'
				>
					<Heading is='h2' my={3}>
						Campus Online <Badge bg='white' color='blue'>admin</Badge>
					</Heading>
					<AuthButton render={
						props => <ButtonOutline my={3} color='white' {...props}/>
					}/>
				</Flex>
			</Container>
		</Box>
		<Flex px={4} py={5} alignItems='center'>
			<Heading color='blue'>
				Beep Beep Beep Beep Beep Beep Beep
			</Heading>
			<Box mx='auto'/>
			<Button>
				Beep
			</Button>
			<ButtonOutline ml={2}>
				Boop
			</ButtonOutline>
		</Flex>
	</Fragment>
)

export default Home
