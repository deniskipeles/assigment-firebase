<script>
    import { goto } from '$app/navigation';
    import { db } from '$lib/firebase';
    import { sub_service_category } from '$lib/store/service';
    import { collection, doc, setDoc } from 'firebase/firestore';
    import { Drawer, Button, CloseButton, Label, Input, Textarea, P, A, Checkbox } from 'flowbite-svelte'
    import { sineIn } from 'svelte/easing';

    export let category
    let name="", description=""
    let cat = $sub_service_category
  
    let hidden3 = true;
    let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
    };


    async function handleSubmit() {
        const docID = name.split(" ").join("-")
        // console.log(data)
        // const documentRef = doc(collection(db, "services-sub-categories"));
        category = doc(db, "services-categories", $sub_service_category);
        const documentRef = doc(db, 'services-sub-categories', docID);
        const data = {
          name,
          description,
          category
        }

        try {
          const res = await setDoc(documentRef, data);
          goto(`/services/view/${docID}`, { replaceState:true })
          hidden3 = true
        } catch (error) {
          
        }
    }
  </script>


  
  <div class="text-center">
    <Button on:click={() => (hidden3 = false)}>Add Sub Service to {$sub_service_category}</Button>
  </div>
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden3} id='sidebar3'>
  <div class='flex items-center'>
    <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>Add Service {$sub_service_category}</h5>
    <CloseButton on:click={() => (hidden3 = true)} class='mb-4 dark:text-white'/>
  </div>
     <form on:submit|preventDefault={handleSubmit} class="mb-6">
        <!-- <div class="mb-6">
          <Label for='email' class='block mb-2'>Your email</Label>
          <Input id='email' name='email' required placeholder="name@company.com" />
        </div> -->
         <div class="mb-6">
          <Label for='subject' class='block mb-2'>Sub Service Name</Label>
          <Input bind:value={name} id='subject' name='subject' required placeholder="Enter Service Name" />
        </div>
        <div class="mb-6">
          <Label for="message" class="mb-2">Sub Service Description</Label>
          <Textarea bind:value={description} id="message" placeholder="Enter Service Description..." rows="4" name="message"/>
        </div>
        <Button type="submit" class='w-full'>Save Sub Service</Button>
     </form>
     <!-- <P class="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <A href='/' class="hover:underline">info@company.com</A>
     </P>
     <P class="text-sm text-gray-500 dark:text-gray-400">
        <A href='/' class="hover:underline">212-456-7890</A>
     </P> -->
  </Drawer>