<script>
	import CourseCategoryForm from "$lib/components/CourseCategoryForm.svelte";
	import ProductCard from "$lib/components/ProductCard.svelte";
	
	/** @type {import('./$types').PageData} */
	export let data;
	let courses = data.record ? data.record : [];
	// console.log("hell",courses)
	import { P, Layout } from 'flowbite-svelte'

</script>



<CourseCategoryForm/>
<div class="md:container md:mx-auto px-4">
	<Layout gap={6}>
	  {#each courses as item}
		 <!-- content here -->
		 <P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
		   <div class="">
			   <h2 class="mt-4 mb-2 font-semibold text-gray-900 dark:text-white">{item.name}</h2>
			   <p class="mb-2 p-0 text-sm font-light text-gray-500 dark:text-gray-300">{item.description}</p>
			   <a href={`/online-courses/${item.id}`} class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-700">
				   Explore Courses 
				   <span class="sr-only">Explore more </span>
				   <svg class="ml-1 w-4 h-4" aria-hidden="true"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
			   </a>
		   </div>
		 </P>
	  {/each}
	</Layout>
</div>
  