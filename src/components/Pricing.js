import React from 'react'
import PropTypes from 'prop-types'

const Pricing = ({data = []}) => (
	<div>
		{data.map(price => (
			<div key={price.plan}>
				<section>
					<h4>{price.plan}</h4>
					<h2>${price.price}</h2>
					<p>{price.description}</p>
					<ul>{price.items.map(item => <li key={item}>{item}</li>)}</ul>
				</section>
			</div>
		))}
	</div>
)

Pricing.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			plan: PropTypes.string,
			price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			description: PropTypes.string,
			items: PropTypes.array,
		}),
	),
}

export default Pricing
