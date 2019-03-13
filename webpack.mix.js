const mix = require('laravel-mix');

const js = {
	src: './src/js/app.js',
	dest: './dist/js'
};
const blocks = {
	src: './src/js/wp-blocks/blocks.jsx',
	dest: './dist/js'
};
const css = {
	src: 'src/scss/main.scss',
	dest: './dist/css'
};
const gutenberg = {
	src: 'src/gutenberg.scss',
	dest: './dist/css'
};

mix.options = {
	exports: {
		node: {
			fs: 'empty'
		},
		target: 'web'
	}
};

const production = mix.inProduction();
const devtool = production ? false : 'source-map';

mix.webpackConfig({
	devtool: devtool
});

if (production) {
	mix.sourceMaps();
}


mix.js(js.src, js.dest);
mix.react(blocks.src, blocks.dest);
mix.sass(css.src, css.dest)
	.sass(gutenberg.src, gutenberg.dest);
