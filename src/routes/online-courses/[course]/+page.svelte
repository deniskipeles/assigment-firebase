<script>
    import CourseCard from "$lib/components/CourseCard.svelte";
	import CourseForm from "$lib/components/CourseForm.svelte";
	import ProductCard from "$lib/components/ProductCard.svelte";
    import { Avatar, Button } from "flowbite-svelte";
    
	export let data;
	let courses = data.record ? data.record : [];
	// console.log("hell",courses)
	
	

</script>

<p>
	<Button on:click={()=>history.back()}>Go Back</Button>
	<CourseForm category={data.course}/>
</p>



<div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
	{#each courses as item}
		 <!-- content here -->
		 <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
			<blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
				<p class="my-4 font-light">{item.description}</p>
			</blockquote>
			<figcaption class="flex items-center justify-center space-x-3">
				<img class="rounded-full w-9 h-9" src={item.tutor_photo} alt="profile picture">
				<!-- <Avatar /> -->
				<div class="space-y-0.5 font-medium dark:text-white text-left">
					<div>{item.tutor_name}</div>
					<div class="text-sm font-light text-gray-500 dark:text-gray-400">Software Engineer at Facebook</div>
				</div>
			</figcaption>    
		</figure>
	{/each}
</div>
