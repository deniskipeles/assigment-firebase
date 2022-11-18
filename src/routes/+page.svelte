<script>
	import ExpertCard from "$lib/components/ExpertCard.svelte";
	import { P, Layout } from 'flowbite-svelte'


	export let data
	const services = data.services ? data.services : []
	const courses = data.courses ? data.courses : []
	const experts = data.experts ? data.experts : []
</script>

<div class="p-8">

	<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
		Online Courses 
	</h1>
	<div class="md:container md:mx-auto px-4 dark:text-white">
		<Layout gap={6} class="dark:text-white">
		  {#each courses as item}
			 <!-- content here -->
			 <P class="mb-3" weight="light" color="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
			   <div class="">
				   <h2 class="mt-4 mb-2 font-semibold text-gray-900 dark:text-white">{item.name}</h2>
				   <p class="mb-2 p-0 text-sm font-light text-gray-500 dark:text-gray-300">{item.description}</p>
				   <a href={`/online-courses/${item.id}`} class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-700">
					   Explore {item.name} Courses 
					   <span class="sr-only">Explore more </span>
					   <svg class="ml-1 w-4 h-4" aria-hidden="true"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				   </a>
			   </div>
			 </P>
		  {/each}
		</Layout>
	</div>


	<hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700">

	<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
		Assignment Help Services
	</h1>

	<div class="md:container md:mx-auto px-4 dark:text-white">
		<Layout gap={6} class="dark:text-white">
		  {#each services as item}
			 <!-- content here -->
			 <P class="mb-3" weight="light" color="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
			   <div class="">
				   <h2 class="mt-4 mb-2 font-semibold text-gray-900 dark:text-white">{item.name}</h2>
				   <p class="mb-2 p-0 text-sm font-light text-gray-500 dark:text-gray-300">{item.description}</p>
				   <a href={`/online-courses/${item.id}`} class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-700">
					   Explore {item.name} Courses 
					   <span class="sr-only">Explore more </span>
					   <svg class="ml-1 w-4 h-4" aria-hidden="true"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				   </a>
			   </div>
			 </P>
		  {/each}
		</Layout>
	</div>


	<hr class="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700">

	<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
		Kenya`s Assignment Help Experts
	</h1>
	<div class="grid grid-flow-col auto-cols-max">
		{#each experts as item}
			 <!-- content here -->
			 <div>
				 <ExpertCard expert={item}/>
			 </div>
		{/each}
	
	</div>
</div>