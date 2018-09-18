import React from 'react'
import styled from 'styled-components'
import {navigateTo} from 'gatsby-link'
import {compose} from 'recompose'
import {Form, withFormik} from 'formik'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'
import {withLayout} from '../../components/Layout'
import Navbar from '../../components/Navbar'
import AboutHero from '../../components/AboutHero'
import MetaTags from '../../components/MetaTags'
import Hero from '../../components/Hero'
import Container from '../../components/Container'
import Text from '../../components/Text'
import {Row, Cell} from '../../components/Grid'
import {FormikField as Input} from '../../components/Input'
import {FormikField as TextArea} from '../../components/TextArea'
import Button from '../../components/Button'
import Link from '../../components/StylableLink'
import UnstyledMap from '../../components/Map'
import meta from './index.json'

const StyledLink = styled(Link)`
	display: block;
	color: currentColor;
	text-decoration: none;
	line-height: 1.5rem;
	padding: 0.5rem 0;
	color: ${colors.base66};
	font-weight: 500;
	&:hover,
	&:focus,
	&:active {
		color: ${colors.base88};
	}
`

const MapWrapper = styled.div`
	position: relative;
	margin-top: 2rem;
	${above.md`
		margin-top: 6rem;
	`};
`

const MapLabel = styled(Link)`
	text-decoration: none;
	color: currentColor;
	display: inline-block;
	display: inline-flex;
	flex-direction: column;
	padding: 1rem 0;
	color: ${colors.white};
	${above.md`
		margin-top: 3rem;
		padding: 2rem;
		background: ${colors.base};
		z-index: 1;
		position: absolute;
	`};
`

const Address = styled.div`
	font-size: 1rem;
	line-height: 1.5rem;
	font-weight: 600;
	color: ${colors.base22};
`

const City = styled(Address)`
	font-weight: 300;
`

const MapZIP = styled.div`
	font-size: 0.875rem;
	font-weight: 400;
	color: ${colors.base44};
	line-height: 1.5rem;
`

const Map = styled(UnstyledMap)`
	width: 100%;
	height: 16rem;
	${above.md`
		height: 25rem;
	`};
`

const validation = ({values}) => {
	const errors = {}
	if (!values.name) {
		errors.name = 'Nome é obrigatório'
	}
	if (!values.message) {
		errors.message = 'Mensagem é obrigatório'
	}
	if (!values.email) {
		errors.email = 'Email é obrigatório'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Email inválido'
	}
	return errors
}

function encode(data) {
	return Object.keys(data)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&')
}

const Wrapper = styled.div`

`

const ContactPage = () => (
	<div style={{background: colors.base, colors: colors.white}}>
		<MetaTags title="Contato" />
		<Navbar style={{position: 'fixed', top: 0, zIndex: 3}} dark={true} />
		<AboutHero contact background={colors.base} color='rgba(255,255,255, 0.2)' style={{marginTop: '7rem'}} />
		<Container>
			<Row>
				<Cell xs={12} md={8}>
					<Form
						name="contact"
						data-netlify="true"
						data-netlify-honeypot="honey"
						style={{width: '100%'}}
					>
						<Input type="hidden" name="form-name" value="contact" />
						<p hidden>
							<Input name="honey" />
						</p>
						<Row>
							<Cell xs={12} sm={6} md={12} lg={6}>
								<Input color='white' name="name" label="Nome" required />
							</Cell>
							<Cell xs={12} sm={6} md={12} lg={6}>
								<Input
									color='white'
									name="email"
									label="Email"
									type="text"
									autoComplete="email"
									autoCapitalize="off"
									required
								/>
							</Cell>
						</Row>
						<TextArea color='white' name="message" label="Mensagem" />
						<Button stretch style={{margin: '2rem 0'}}>
							Enviar
						</Button>
					</Form>
				</Cell>

			</Row>
		</Container>
		<MapWrapper>
			<Container>
				{meta.firstLine &&
					meta.secondLine &&
					meta.zip && (
						<MapLabel to="https://www.google.com.br/maps/place/Av.+Jos%C3%A9+de+Souza+Campos,+1073+-+Cambu%C3%AD,+Campinas+-+SP,+13025-320">
							<Address>{meta.firstLine}</Address>
							<City>{meta.secondLine}</City>
							<MapZIP>{meta.zip}</MapZIP>
						</MapLabel>
					)}
			</Container>
			{meta.lat &&
				meta.long && (
					<Map coordinates={[meta.lat, meta.long]} zoom={[12, 16]} />
				)}
		</MapWrapper>
	</div>
)

/* eslint-disable no-unused-vars */
const enhance = compose(
	withFormik({
		isInitialValid: false,
		mapPropsToValues: props => ({name: '', email: '', message: ''}),
		validate: (values, props) => validation({values, props}),
		handleSubmit: async (values, {setSubmitting}) => {
			try {
				await fetch('/', {
					method: 'POST',
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					body: encode({...values, 'form-name': 'contact'}),
				})
				setSubmitting(false)
				navigateTo('./sucesso')
			} catch (error) {
				alert(error)
			}
		},
	}),
)
/* eslint-enable no-unused-vars */

export default enhance(withLayout(ContactPage))
