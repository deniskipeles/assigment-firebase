<script>
    import { Card, List as Listgroup, Avatar } from "flowbite-svelte";
     let list = [
      { img: { src: "https://flowbite-svelte.com/images/profile-picture-1.webp", alt: "Neil Sims",},
        name: "Neil Sims", email: "email@windster.com", value: "$320"
      },
      { img: { src: "https://flowbite-svelte.com/images/profile-picture-2.webp", alt: "Bonnie Green" },
        name: "Bonnie Green", email: "email@windster.com", value: "$3467"
      },
      { img: { src: "https://flowbite-svelte.com/images/profile-picture-3.webp", alt: "Michael Gough" },
        name: "Michael Gough", email: "email@windster.com", value: "$67"
      },
    ];
  </script>
  <Card padding="xl" size="md">
    <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
        <a href="/" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a>
    </div>
    <Listgroup items={list} let:item class="border-0 dark:!bg-transparent">
      <div class="flex items-center space-x-4">
        <Avatar src={item.img.src} alt={item.img.alt} class="flex-shrink-0"/>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {item.name}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {item.email}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {item.value}
        </div>
      </div>
    </Listgroup>
  </Card>