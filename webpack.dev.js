const path = require('path');
module.exports = {
	watch: true,
	mode: 'development',
	entry: {
		'index': './js/entry/index.js'
	},
	output: {
		filename: '[name].bundle.js',   // Output bundle filename
		path: path.resolve(__dirname, 'src/main/resources/static/script'),
		library: 'bestsell_lib'
	},
	module: {
		rules: [
			// Add rules for processing different file types (e.g., JS, CSS)
			{
				  test: /\.js$/,
				// exclude: /node_modules/,
				use: {
					loader: 'babel-loader',  // Use Babel for JavaScript files
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: require.resolve('jquery'),
				use: {
					loader: 'expose-loader',
					options: {
						exposes: ['$', 'jQuery']
					}
				}
			},
			{
				test: require.resolve('underscore'),
				use: [{
					loader: 'expose-loader',
					options: {
						exposes: ['_']
					}
				}]
			},
			{
				test: /\.html$/,  // Adjust the regex to match your text file extensions
				use: 'text-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}
		],
	},
	resolve: {
			alias: {
				js: path.resolve(__dirname, 'js/'),
				'node_modules': path.resolve(__dirname, 'node_modules/'),
				'html': path.resolve(__dirname, 'src/main/resources/templates'),
			},
	},
	// resolve: {
	// 	extensions: ['.js', '.json', '.jsx'],
	// 	alias: {
	// 		utilities: path.resolve(__dirname, 'js'),
	// 	},
	// 	modules: ['js', 'node_modules'],
	// },
	// Add plugins, resolve options, and other configurations as needed
};