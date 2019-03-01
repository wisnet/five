const mix = require('laravel-mix');

console.log(mix);

mix.options = {
	exports: {
		node: {
			fs: 'empty'
		},
		target: 'web'
	}
};
mix.js('./src/js/app.js', './dist/js');
mix.react('./src/js/wp-blocks/blocks.jsx', './dist/js');
mix.sass('src/scss/main.scss', './dist/css')
	.sass('src/gutenberg.scss', './dist/css');
