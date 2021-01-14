module.exports = {
	entry: './pages/index.tsx',
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	env: {
		DOMAIN_NAME: process.env.NEXT_PUBLIC_DOMAIN_NAME,
		GA_TRACKING_ID: process.env.GA_TRACKING_ID,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader'
				}
			}
		]
	}
};
