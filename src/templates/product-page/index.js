import React from 'react'
import PropTypes from 'prop-types'
import Features from '../../components/Features'
import Testimonials from '../../components/Testimonials'
import Pricing from '../../components/Pricing'

export const ProductPage = ({
	title,
	heading,
	description,
	intro,
	main,
	testimonials,
	pricing,
}) => (
	<section>
		<h2>{title}</h2>
		<div>
			<h3>{heading}</h3>
			<p>{description}</p>
		</div>

		<Features gridItems={intro.blurbs} />

		<div>
			<h3>{main.heading}</h3>
			<p>{main.description}</p>
		</div>

		<article>
			<img src={main.image1.image} alt={main.image1.alt} />
		</article>
		<article>
			<img src={main.image2.image} alt={main.image2.alt} />
		</article>
		<article>
			<img src={main.image3.image} alt={main.image3.alt} />
		</article>

		<Testimonials testimonials={testimonials} />
		<h2>{pricing.heading}</h2>
		<p>{pricing.description}</p>
		<Pricing data={pricing.plans} />
	</section>
)

ProductPage.propTypes = {
	title: PropTypes.string,
	heading: PropTypes.string,
	description: PropTypes.string,
	intro: PropTypes.shape({
		blurbs: PropTypes.array,
	}),
	main: PropTypes.shape({
		heading: PropTypes.string,
		description: PropTypes.string,
		image1: PropTypes.object,
		image2: PropTypes.object,
		image3: PropTypes.object,
	}),
	testimonials: PropTypes.array,
	pricing: PropTypes.shape({
		heading: PropTypes.string,
		description: PropTypes.string,
		plans: PropTypes.array,
	}),
}

export default ProductPage
