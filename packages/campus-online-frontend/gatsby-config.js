/* eslint-env node */
module.exports = {
	mapping: {
		'MarkdownRemark.fields.author': 'MarkdownRemark',
		'MarkdownRemark.fields.editorial': 'MarkdownRemark',
		'MarkdownRemark.fields.posts': 'MarkdownRemark',
	},
	plugins: [
		'gatsby-plugin-lodash',
		'gatsby-plugin-styled-components',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: '#29d',
				showSpinner: false,
			},
		},
		{
			resolve: 'gatsby-plugin-eslint',
			options: {
				test: /\.js$|\.jsx$/,
				exclude: /(node_modules|cache|public)/,
				options: {
					emitWarning: true,
					failOnError: false,
				},
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/uploads`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 760,
							showCaptions: true,
						},
					},
					'gatsby-remark-external-links',
					'gatsby-remark-responsive-iframe',
				],
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-transformer-campus-post',
		{
			resolve: 'gatsby-custom-netlify-cms-alias',
			options: {
				package: '@leonardodino/netlify-cms',
			},
		},
		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/admin`,
			},
		},
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
}
