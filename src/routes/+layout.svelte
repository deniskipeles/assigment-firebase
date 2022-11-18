<script>

  
  
  import Footer from '$lib/components/Footer.svelte';
	import CONSTANTS from "$lib/CONSTANTS.js";
	import '../app.css';
	import {
		DarkMode
	} from 'flowbite-svelte';

	// import { Responsive } from 'svelte-sidebar-menu';

    import NavBar from '$lib/components/NavBar.svelte';
	import { loadCourses,loadServices } from "./fetchLayout";
    
	
	// /** @type {import('./$types').PageData} */
	// export let data;
	// export let lastVisible;
	


	// Darkmode component
	let btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 fixed right-2 top-24 z-50';
	



	

</script>

<DarkMode {btnClass} />
<!-- <Responsive /> -->
<NavBar {loadCourses} {loadServices}/>

<div class="dark:bg-gray-800">
    <main class=" w-full mx-auto">
      <slot />
    </main>
</div>

<Footer/>

<svelte:head>
	<title>{CONSTANTS.siteTitle}</title>
	<meta
		name="description"
		content="Flowbite-Svelte-Starter is a quick way to start Svelte and Flowbite/Tailwind CSS. It comes with SvelteKit, Tailwind CSS, Flowbite,
		Flowbite-Svelte, ESlint, Typescript, Playwright, Prettier, Svelte-heros (Heroicons), Dark mode activated."
	/>
</svelte:head>
