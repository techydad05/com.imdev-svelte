import preprocess from 'svelte-preprocess';
// import adapter from '@sveltejs/adapter-auto';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],

	kit: {
		// adapter: adapter(),
		adapter: vercel(options),
		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		}),
	]
};

export default config;
