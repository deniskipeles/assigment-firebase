<script>
    import ExpertCard from "$lib/components/ExpertCard.svelte";
    import RegisterExpertForm from "$lib/components/RegisterExpertForm.svelte";
    import { user } from "$lib/store/user";


    /** @type {import('./$types').PageData} */
	export let data;
	let experts = data.record ? data.record : [];

</script>

{#if $user.uid}
     <!-- content here -->
     <RegisterExpertForm/>
{/if}
<div class="grid grid-flow-col auto-cols-max">
    {#each experts as item}
         <!-- content here -->
         <div>
             <ExpertCard expert={item}/>
         </div>
    {/each}

</div>