module.exports = {
	entry: './pages/index.tsx',
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	env: {
		DOMAIN_NAME: 'http://localhost'
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
