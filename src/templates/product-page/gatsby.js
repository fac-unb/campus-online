import React from 'react'
import PropTypes from 'prop-types'
import Template from '.'

const ProductPage = ({data: {markdownRemark}}) => {
	const {frontmatter} = markdownRemark

	return (
		<Template
			image={frontmatter.image}
			title={frontmatter.title}
			heading={frontmatter.heading}
			description={frontmatter.description}
			intro={frontmatter.intro}
			main={frontmatter.main}
			testimonials={frontmatter.testimonials}
			fullImage={frontmatter.full_image}
			pricing={frontmatter.pricing}
		/>
	)
}

ProductPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object,
		}),
	}),
}

export default ProductPage

export const productPageQuery = graphql`
	query ProductPage($id: String!) {
		markdownRemark(id: {eq: $id}) {
			frontmatter {
				title
				image
				heading
				description
				intro {
					blurbs {
						image
						text
					}
					heading
					description
				}
				main {
					heading
					description
					image1 {
						alt
						image
					}
					image2 {
						alt
						image
					}
					image3 {
						alt
						image
					}
				}
				testimonials {
					author
					quote
				}
				full_image
				pricing {
					heading
					description
					plans {
						description
						items
						plan
						price
					}
				}
			}
		}
	}
`
