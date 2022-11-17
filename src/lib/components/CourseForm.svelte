<script>
    import { goto } from '$app/navigation';
    import { db, storage } from '$lib/firebase';
    import { user } from '$lib/store/user';
    // import CONSTANTS from '$lib/CONSTANTS';
    
    import { collection, doc, query, setDoc } from 'firebase/firestore';
    import { Drawer, Button, CloseButton, Label, Input, Textarea, Avatar } from 'flowbite-svelte'
    import { sineIn } from 'svelte/easing';

    export let category

    let resolve = category.split("-").join(" ")

    let name="",
        description="",
        price=0, 
        previous_price=0,
        rating=0,
        rating_total=0,
        tutor_name="",
        tutor_id="",
        tutor_photo=null,
        course_photo="/course.png",
        tutor,
        about_tutor="",
        time="1hr:00mins",
        progress=0,
        default_user_icon="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png",
        default_course_icon="/course.png";


    let hidden4 = true;
    let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
    };


    tutor_id=$user.uid
    tutor_name=$user.displayName
    tutor_photo=$user.photoURL
    async function handleSubmit() {
      const newDocRef = doc(collection(db, "online-courses"));
      category = doc(db, "online-courses-category", category);
      tutor = doc(db, "users", tutor_id);
      price = Number(price)
      previous_price = Number(previous_price)

        const data = {
          name,
          description,
          about_tutor,
          price,
          previous_price,
          rating,
          tutor_name,
          tutor_id,
          tutor_photo,
          tutor,
          category,
          time,
          rating_total,
          course_photo
        }
        
        // const documentRef = doc(db, 'online-courses-category', docID);
        try {
          const res = await setDoc(newDocRef, data);
          // console.log(res)
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
    
    let fileinput1, fileinput, uploadCourseError="", uploadTutorError="";
      
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
                if (caller=="course") {
                  uploadCourseError = "failed to upload logo"
                  course_photo = default_course_icon
                }
                if (caller=="tutor") {
                  uploadTutorError = "failed to upload image"
                  tutor_photo = default_user_icon
                }
                reject("failed to upload");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log(downloadURL)
                    // photos.push(downloadURL + '')
                    if (caller=="course") {
                      course_photo = downloadURL
                    }
                    if (caller=="tutor") {
                      tutor_photo = downloadURL
                    }
                    resolve(downloadURL);
                });
            }
        );
    });
  </script>





 




  
  <div class="text-center">
    <Button on:click={() => (hidden4 = false)}>Add A Course That You Tutor</Button>
  </div>
 
  
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden4} id='sidebar4'>
    <div class='flex items-center'>
      <h5 id="drawer-label" class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>My New Course To Tutor In {resolve}</h5>
      <CloseButton on:click={() => (hidden4 = true)} class='mb-4 dark:text-white'/>
    </div>
     <form on:submit|preventDefault={handleSubmit} class="mb-6">
      <div class="mb-6">
        <Label for='title' class='block mb-2'>Course Title</Label>
        <Input bind:value={name} id='title' name='title' required placeholder="Course Description" />
      </div>
      <div class="mb-6">
        <Label for="description" class="mb-2">Course Description</Label>
        <Textarea bind:value={description} id="message" placeholder="Write course description..." rows="4" name="message"/>
      </div>
      <!-- <div id="app">
        <img class="avatar" src="/course.png" alt="d" />
      </div>
      <Label class="pb-2" for='small_size' >Course Logo</Label> -->
      <div id="app">
        <h1>Upload Course Logo</h1>
        
              {#if course_photo}
              <img class="avatar" src="{course_photo}" alt="d" />
              {:else}
              <img class="avatar" src={default_course_icon} alt="" /> 
              {/if}
              <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput1.click();}} />
              <div class="chan" on:click={()=>{fileinput1.click();}}>{(course_photo==null||course_photo.length==0)?"Choose Course Logo":"Change Course Logo"}</div>
              <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={async(e)=>await onFileSelected(e,"course")} bind:this={fileinput1} >
            <p>{uploadCourseError}</p>
      </div>
      <div class="mb-6">
        <Label for='time' class='block mb-2'>Time</Label>
        <Input bind:value={time} id='time' name='time' required placeholder="Time Span" />
      </div>
      <div class="mb-6">
        <Label for='price' class='block mb-2'>Course Price</Label>
        <Input type="number" bind:value={price} id='price' name='price' required placeholder="Course Price" />
      </div>
      <!-- <div class="mb-6">
        <Input id='date' name='date' required type='date' />
      </div>
      <div class='mb-4'>
        <div class="relative">
          <Input noBorder id="search" placeholder="Add guest email" class="p-3">
          </Input>
          <Button textSize="text-sm" class="absolute inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-700 rounded-lg right-2 bottom-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit"><svg class="w-4 h-4 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>Add</Button>
        </div>
      </div> -->
      <div id="app">
        <h1>Upload Your Image</h1>
        
              {#if tutor_photo}
              <img class="avatar" src="{tutor_photo}" alt="d" />
              {:else}
              <img class="avatar" src={default_user_icon} alt="" /> 
              {/if}
              <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
              <div class="chan" on:click={()=>{fileinput.click();}}>{(tutor_photo==null||tutor_photo.length==0)?"Choose Tutoring Image":"Change Tutoring Image"}</div>
              <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={async(e)=>await onFileSelected(e,"tutor")} bind:this={fileinput} >
            <p>{uploadTutorError}</p>
      </div>
        <div class="flex mb-4 -space-x-4">
          <img class="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800" src={$user.photoURL} alt="">
          <!-- <Avatar id="avatar-menu" src={$user.photoURL} /> -->
        </div>
        <div class="mb-6">
          <Label for="user-description" class="mb-2">Tutor Description</Label>
          <Textarea bind:value={about_tutor} id="user-description" placeholder="Write a description about yourself..." rows="4" name="user-description"/>
        </div>
        <Button type="submit" class="w-full"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> Add Course</Button>
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