<script>
    import { goto } from '$app/navigation';
    import { db, storage } from '$lib/firebase';
    import { user as userStore } from '$lib/store/user';
    // import CONSTANTS from '$lib/CONSTANTS';
    
    import { collection, doc, query, setDoc } from 'firebase/firestore';
    import { Drawer, Button, CloseButton, Label, Input, Textarea, Avatar } from 'flowbite-svelte'
    import { sineIn } from 'svelte/easing';

    let name="",
        rating=0,
        rating_total=0,
        user="",
        description="",
        progress=0,
        professionality="",
        jobs_done=0,
        reviews=[],
        time="5hrs:30mins",
        more={},
        user_icon="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"


    let hidden4 = true;
    let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
    };


    user=$userStore.uid
    name=$userStore.displayName
    user_icon=$userStore.photoURL
    async function handleSubmit() {
      // const newDocRef = doc(collection(db, "experts"));
      const newDocRef = doc(db, 'experts', user);
      user = doc(db, "users", user);

        const data = {
          name,
          rating,
          rating_total,
          user,
          professionality,
          jobs_done,
          reviews,
          user_icon,
          more,
          time,
          description
        }
        
        // const documentRef = doc(db, 'online-courses-category', docID);
        try {
          const res = await setDoc(newDocRef, data);
          console.log(res)
          hidden4=true
          const url = location.pathname
          goto(url, { replaceState:true })
        } catch (error) {
          console.log(error)
        }
            
        // const docRef = await addDoc(collection("article"), );
        // console.log(newArticleRef.id)
    }
    // import { Fileupload } from 'flowbite-svelte'
    
    let fileinput, uploadError="";
      
    const onFileSelected =async(e,caller)=>{
      let image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async(e) => {
        await uploadFile(image,caller)
      };
    }

    import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
    
    const uploadFile = async (pic,caller) => new Promise((resolve, reject) => {
        // pic = e.target.file[0];
        // const file = pic.blob()
        // console.log(pic)
        const storageRef = ref(storage, `${Date.now()}/${pic.name}`);
        const uploadTask = uploadBytesResumable(storageRef, pic);

        uploadTask.on("state_changed",
            (snapshot) => {
                progress=Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                if (caller=="user") {
                  uploadError = "failed to upload logo"
                }
                reject("failed to upload");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log(downloadURL)
                    // photos.push(downloadURL + '')
                    if (caller=="user") {
                      user_icon = downloadURL
                    }
                    resolve(downloadURL);
                });
            }
        );
    });
  </script>





 




  
  <div class="text-center">
    <Button on:click={() => (hidden4 = false)}>Create Your Expertise Account</Button>
  </div>
 
  
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden4} id='sidebar4'>
    <div class='flex items-center'>
      <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>Create My Expertise Account</h5>
      <CloseButton on:click={() => (hidden4 = true)} class='mb-4 dark:text-white'/>
    </div>
     <form on:submit|preventDefault={handleSubmit} class="mb-6">
      <div class="mb-6">
        <Label for='title' class='block mb-2'>Name</Label>
        <Input bind:value={name} id='title' name='title' required placeholder="Course Description" />
      </div>
      <div class="mb-6">
        <Label for='profession' class='block mb-2'>professionality</Label>
        <Input bind:value={professionality} id='profession' name='profession' required placeholder="Enter professionality" />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">Self Description</Label>
        <Textarea bind:value={description} id="message" placeholder="Write about yourself..." rows="4" name="message"/>
      </div>
      <div class="mb-6">
        <Label for='time' class='block mb-2'>Time Span</Label>
        <Input bind:value={time} id='time' name='time' required placeholder="Time Span" />
      </div>
      <div id="app">
        <h1>Upload Your Image</h1>
        
              {#if user_icon}
              <img class="avatar" src="{user_icon}" alt="d" />
              {:else}
              <img class="avatar" src={user_icon} alt="" /> 
              {/if}
              <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
              <div class="chan" on:click={()=>{fileinput.click();}}>{(user_icon==null||user_icon.length==0)?"Choose Tutoring Image":"Change Tutoring Image"}</div>
              <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={async(e)=>await onFileSelected(e,"user")} bind:this={fileinput} >
            <p>{uploadError}</p>
      </div>
        <Button type="submit" class="w-full"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>Register As Expert</Button>
     </form>
  </Drawer>





<style>
	#app{
      display:flex;
      align-items:center;
      justify-content:center;
      flex-flow:column;
  }
 
	.upload{
		display:flex;
	  height:40px;
		width:40px;
		cursor:pointer;
	}
	.avatar{
		display:flex;
		height:100px;
	}
</style>