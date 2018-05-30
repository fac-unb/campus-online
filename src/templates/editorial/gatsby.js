import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import Template from '.'

const Editorial = ({data: {markdownRemark}}) => {
	const {
		frontmatter: {title, color, semester},
	} = markdownRemark
	return (
		<Fragment>
			<Helmet title={`${title} | Blog`} />
			<Navbar
				style={{position: 'sticky', top: 0, zIndex: 2}}
				links={[
					{href: '/about', label: 'Sobre'},
					{href: '/contact', label: 'Contato'},
				]}
			/>
			<Container>
				<Template name={title} color={color} semester={semester} />
			</Container>
		</Fragment>
	)
}

Editorial.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.shape({
				title: PropTypes.string,
				color: PropTypes.string,
				semester: PropTypes.string,
			}),
		}),
	}),
}

export default Editorial

export const pageQuery = graphql`
	query EditorialByID($id: String!) {
		markdownRemark(id: {eq: $id}) {
			frontmatter {
				color
				title
				semester
			}
		}
	}
`
