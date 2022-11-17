<script>
    import { goto } from '$app/navigation';
    import { db } from '$lib/firebase';
    // import CONSTANTS from '$lib/CONSTANTS';
    import { doc, setDoc } from 'firebase/firestore';
    import { Drawer, Button, CloseButton, Label, Input, Textarea } from 'flowbite-svelte'
    import { sineIn } from 'svelte/easing';

    let name="",description="",course_count=0;
    let hidden4 = true;
    let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
    };


    async function handleSubmit() {
        const data = {
          name,
          description,
          course_count
        }
        const docID = name.split(" ").join("-")
        // console.log(data)
        const documentRef = doc(db, 'online-courses-category', docID);
        const res = await setDoc(documentRef, data);
            
        // const docRef = await addDoc(collection("article"), );
        // console.log(newArticleRef.id)
        goto(`/online-courses`, { replaceState:true })
    }
  </script>
  
  <div class="text-center">
    <Button on:click={() => (hidden4 = false)}>Add Course Category</Button>
  </div>
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden4} id='sidebar4'>
    <div class='flex items-center'>
      <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>New Course Category</h5>
      <CloseButton on:click={() => (hidden4 = true)} class='mb-4 dark:text-white'/>
    </div>
     <form on:submit|preventDefault={handleSubmit} class="mb-6">
      <div class="mb-6">
        <Label for='title' class='block mb-2'>Title</Label>
        <Input bind:value={name} id='title' name='title' required placeholder="Course Title" />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">Description</Label>
        <Textarea bind:value={description} id="message" placeholder="Write course description..." rows="4" name="message"/>
      </div>
      <Button type="submit" class="w-full"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> Create event</Button>
     </form>
  </Drawer>