const config = {
	// mode: 'jit',

	content: ['./src/**/*.{html,js,svelte,ts,md,svelte.md}'],
    
	theme: {
		extend: {}
	},

	plugins: [
		require('daisyui'),
	]
};

module.exports = config;
