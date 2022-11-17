<script>
	import CONSTANTS from '$lib/CONSTANTS';
    import CourseCard from "$lib/components/CourseCard.svelte";
	import CourseForm from "$lib/components/CourseForm.svelte";
	import ProductCard from "$lib/components/ProductCard.svelte";
    // import { Avatar, Button } from "flowbite-svelte";
    
	export let data;
	let courses = data.record ? data.record : [];
	// console.log("hell",courses)
	

	import { Card, Button, Badge, Rating } from "flowbite-svelte";
	import { P, Layout } from 'flowbite-svelte'
	let hCard = false;
	

</script>






<div class="md:container md:mx-auto px-4">
	<p>
		<Button on:click={()=>history.back()}>Go Back</Button>
		<CourseForm category={data.course}/>
	</p>
	<Layout gap={6}>
	  {#each courses as item}
		 <!-- content here -->
		 <P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400">
			<Card padding="none">
				<a href="/">
					<img class="p-8 rounded-t-lg" src={item.course_photo ? item.course_photo : "/course.png"} alt="product 1" />
				</a>
			  <div class="px-5 pb-5">
				<a href="/">
				  <h5 class='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
					{item.name}
				  </h5>
				  <div class="text-sm font-light text-gray-500 dark:text-gray-400">{item.description}</div>
				</a>
				<Rating rating={item.rating} size="18" class="mt-2.5 mb-5">
				  <Badge slot="text" class="ml-3">{item.rating}</Badge>
				</Rating>
				<div class="flex items-center justify-center space-x-3">
					<img class="rounded-full w-9 h-9" src={item.tutor_photo ? item.tutor_photo : "/tutor.jpg"} alt="profile picture"/>
					<div class="space-y-0.5 font-medium dark:text-white text-left">
						<div>{item.tutor_name ? item.tutor_name : "i am a tutor"}</div>
						<div class="text-sm font-light text-gray-500 dark:text-gray-400">{item.about_tutor ? item.about_tutor : "i tutor "+item.name}</div>
					</div>
				</div> 
				<div class="flex justify-between items-center">
				  <span class="text-3xl font-bold text-gray-900 dark:text-white">{item.price}</span>
				  <Button href="/">Buy now</Button>
				</div>
			  </div>
			</Card>
		 </P>
	  {/each}
	</Layout>
</div>