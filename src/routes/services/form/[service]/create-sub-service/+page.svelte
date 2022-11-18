<script>
    import AddServiceSubForm from "$lib/components/AddServiceSubForm.svelte";
    import { sub_service_category } from "$lib/store/service";
    export let data = {}

    let category = $sub_service_category
    console.log(category)
</script>



<AddServiceSubForm {category}/>