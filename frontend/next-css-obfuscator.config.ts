module.exports = {
	enable: true,
	mode: 'random',
	refreshClassConversionJson: false,
	allowExtensions: ['.jsx', '.tsx', '.js', '.ts', '.html', '.rsc'],

	blackListedFolderPaths: ['./.next/cache', /\.next\/server\/pages\/api/, /_document..*js/, /_app-.*/, /__.*/],
};
