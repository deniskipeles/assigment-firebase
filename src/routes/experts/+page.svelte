<script>
    import ExpertCard from "$lib/components/ExpertCard.svelte";
    import RegisterExpertForm from "$lib/components/RegisterExpertForm.svelte";


    /** @type {import('./$types').PageData} */
	export let data;
	let experts = data.record ? data.record : [];

</script>


<RegisterExpertForm/>
{#each experts as item}
     <!-- content here -->
     <ExpertCard expert={item}/>
{/each}