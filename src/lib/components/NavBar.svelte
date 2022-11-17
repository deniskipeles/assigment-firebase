<script>
  import { user } from "$lib/store/user";
  import { fetcher } from "$lib/fetcher";
  import { service as sub_services } from "$lib/store/service";
  import { Navbar,Avatar, DropdownHeader, NavBrand, NavHamburger, NavUl, NavLi, Chevron, MegaMenu, DropdownDivider, Dropdown, DropdownItem, Button } from 'flowbite-svelte'
  // import CourseCategoryForm from "./CourseCategoryForm.svelte";

	// import { page } from '$app/stores';
	import { signOut, onAuthStateChanged } from "firebase/auth";
	import { goto } from '$app/navigation';
  import { auth, db } from "$lib/firebase";

  export let loadServices
  export let loadCourses

  async function fetchSuperCourses() {
    const {record,error} = await loadCourses()
    // console.log(record)
    courses_category.set(record)
  }
  async function fetchSuperServices() {
    const {record,error} = await loadServices()
    // console.log(record)
    services_category.set(record)
  }

	// const auth = getAuth();
	onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      // console.log(userFirebase)
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      user.set(userFirebase)
      // ...
    }
	});

	const logout = () => {
		signOut(auth).then(() => {
      user.set({})
			goto(`/`, { replaceState:true })
		}).catch((error) => {
			// An error happened.
		});
	}






  import { doc } from "firebase/firestore";
  import CONSTANTS from "$lib/CONSTANTS";
  import { UserCircle } from "svelte-heros";
    import { courses_category } from "$lib/store/courses-category";
    import { services_category } from "$lib/store/services-category";
  

  async function fetchServices(id) {
    const categoryDocRef = doc(db, "services-categories", id);
    const filters = {
      key:"category",
      value: categoryDocRef
    }
    const { record, error } = await fetcher("services-sub-categories",filters)
    sub_services.set(record)
    console.log(record)
  }
  let siteName = CONSTANTS.siteName
  let siteLogo = CONSTANTS.logo_url
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
      <img src={siteLogo} class="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{siteName}</span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
      <NavLi href="/">Home</NavLi>
      <NavLi href="/online-courses">Online Courses</NavLi>
      <!-- <NavLi on:click={fetchSuperCourses}><Chevron aligned>Online Courses</Chevron></NavLi> -->
      {#if $courses_category.length > 0}
         <!-- <MegaMenu full items={$courses_category} let:item>
           <a href={`/online-courses/${item.id}`} class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 h-full">
             <div class="font-semibold dark:text-white">{item.name}</div>
             <span class="text-sm font-light text-gray-500 dark:text-gray-400">{item.description}</span>
           </a>
           
           <div slot="extra" class="">
               <h2 class="mt-4 mb-2 font-semibold text-gray-900 dark:text-white">Online Courses Offered</h2>
               <p class="mb-2 p-0 text-sm font-light text-gray-500 dark:text-gray-300">At {CONSTANTS.siteName}, we have a variety of online preferences courses to parsue.</p>
               <a href="/online-courses" class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-700">
                   Explore our Courses 
                   <span class="sr-only">Explore our more </span>
                   <svg class="ml-1 w-4 h-4" aria-hidden="true"  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
               </a>
           </div>
         </MegaMenu> -->
      {/if}
      <NavLi on:click={fetchSuperServices}><Chevron aligned>Services</Chevron></NavLi>
      {#if $services_category.length > 0}
         <!-- content here -->
         <MegaMenu full items={$services_category} let:item>
           <!-- <a href="/" class="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 h-full">
             <div class="font-semibold dark:text-white">{item.name}</div>
           </a> -->
           <div>
             <DropdownItem on:click={async()=>{
               await fetchServices(item.id)
             }} class="flex items-center justify-between"><Chevron placement="right">{item.name}</Chevron></DropdownItem>
             <Dropdown placement="right-start">
               {#each $sub_services as sub_item}
                  <!-- content here -->
                  <DropdownItem>{sub_item.name}</DropdownItem>
               {/each}
             </Dropdown>
             <span class="text-sm font-light text-gray-500 dark:text-gray-400">{item.description}</span>
   
           </div>
         </MegaMenu>
      {/if}
      <NavLi id="nav-menu" class="cursor-pointer"><Chevron aligned>Resources</Chevron></NavLi>
      <Dropdown triggeredBy="#nav-menu" class="w-44 z-20">
        <DropdownItem>Answers</DropdownItem>
        <DropdownItem>Questions</DropdownItem>
        <DropdownItem>Samples</DropdownItem>
        <DropdownItem>University Courses</DropdownItem>
        <DropdownDivider />
      </Dropdown>
      <NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Referencing</Chevron></NavLi>
      <Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
        <DropdownItem>Moi University</DropdownItem>
        <DropdownItem>UON</DropdownItem>
        <DropdownItem>MKSU</DropdownItem>
        <DropdownItem>MKU</DropdownItem>
        <DropdownDivider />
      </Dropdown>
    
      <NavLi href="/experts">Experts</NavLi>
      <NavLi href="/reviews">Reviews</NavLi>
      {#if $user.uid == null || $user.uid == undefined}
         <!-- content here -->
         <NavLi href="/login">Login</NavLi>
         <NavLi href="/register">Sign Up</NavLi>
      {:else}
         <!-- else content here -->
         <div class="flex items-center md:order-2">
          
          {#if $user.photoURL}
             <!-- content here -->
             <Avatar id="avatar-menu" src={ $user.photoURL} />
          {:else}
             <!-- else content reviewshere -->
             <UserCircle id="avatar-menu"/>
          {/if}
           <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1"/>
         </div>
         <Dropdown placement="bottom" triggeredBy="#avatar-menu">
           <DropdownHeader>
           <span class="block text-sm"> {$user.displayName ? $user.displayName : "no name"} </span>
           <span class="block truncate text-sm font-medium"> {$user.email ? $user.email : "no email"} </span>
           </DropdownHeader>
           <DropdownItem>Dashboard</DropdownItem>
           <DropdownItem>Settings</DropdownItem>
           <DropdownItem>Earnings</DropdownItem>
           <DropdownDivider />
           <DropdownItem on:click={logout}>Sign out</DropdownItem>
         </Dropdown>
      {/if}
  </NavUl>
</Navbar>