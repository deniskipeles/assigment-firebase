<script>
	import CONSTANTS from '$lib/CONSTANTS.js';
    import { Card, Button, Rating, Badge } from "flowbite-svelte";
    
  </script>
  <Card padding="none">
      <a href="/">
          <img class="p-8 rounded-t-lg" src={CONSTANTS.watches_image} alt="product 1" />
      </a>
    <div class="px-5 pb-5">
      <a href="/">
        <h5 class='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
          Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
        </h5>
      </a>
      <Rating rating="4" size="18" class="mt-2.5 mb-5">
        <Badge slot="text" class="ml-3">4</Badge>
      </Rating>
      <div class="flex justify-between items-center">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">$543</span>
        <Button href="/">Buy now</Button>
      </div>
    </div>
  </Card>