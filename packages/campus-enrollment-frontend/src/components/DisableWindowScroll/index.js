import React from 'react'

export default class DisableWindowScroll extends React.Component {
	constructor(props) {
		super(props)
		this.$html = document.querySelector('html')
	}
	componentDidMount() {
		this.$html.style.overflowY = 'hidden'
	}
	componentWillUnmount() {
		this.$html.style.removeProperty('overflow-y')
	}
	render() {
		return null
	}
}
