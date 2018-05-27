import React from 'react'
import Content from '../../components/Content'

const AboutPage = ({title, content, contentComponent}) => (
	<section>
		<h2>{title}</h2>
		<Content>{content}</Content>
	</section>
)

export default AboutPage
