<script>
  import CONSTANTS from '$lib/CONSTANTS';
  import { Card, ToolbarButton, Dropdown, DropdownItem, Avatar, Button, Rating } from "flowbite-svelte";
  

  export let expert;
</script>
  <Card padding='sm'>
    <div class="flex justify-end">
      <ToolbarButton class="dots-menu text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
      </ToolbarButton>
      <Dropdown class="w-36" triggeredBy=".dots-menu">
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Export data</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </Dropdown>
    </div>
    <div class="flex flex-col items-center pb-4">
        <Avatar size="lg" src={expert.user_icon} />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{expert.name}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{expert.jobs_done} jobs completed</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{expert.reviews ? expert.reviews.length : 0} reviews</span>
        <Rating total={5} rating={expert.rating} ceil />
        <span class="text-sm text-gray-500 dark:text-gray-400">{expert.description}</span>
        <div class="flex mt-4 space-x-3 lg:mt-6">
          <Button>Add Favourite</Button>
          <Button color="light" class="dark:text-white">Hire</Button>
        </div>
    </div>
  </Card>