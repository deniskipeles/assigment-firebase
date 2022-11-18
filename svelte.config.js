// import preprocess from "svelte-preprocess";
// import adapter from "@sveltejs/adapter-auto";

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   kit: {
//     adapter: adapter(),
//   },

//   preprocess: [
//     preprocess({
//       postcss: true,
//     }),
//   ],
// };

// export default config;



import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte',],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
	],

	kit: {
		adapter: adapter({ edge: true })
	}
};

export default config;
