import React from 'react'
const getDisplayName = C => C.displayName || C.name || 'UnknownComponent'
const wrapDisplayName = (Component, wrapperName = 'hoc') => (
	`${wrapperName}(${getDisplayName(Component)})`
)

export const {Provider, Consumer} = React.createContext()

export const withFirebase = Component => {
	const EnhancedComponent = props => (
		<Consumer>
			{firebase => <Component {...props} firebase={firebase}/>}
		</Consumer>
	)
	EnhancedComponent.displayName = wrapDisplayName(Component, 'withFirebase')
	return EnhancedComponent
}
