<script>
    import {
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarDropdownWrapper,
		SidebarDropdownItem,
		DarkMode
	} from 'flowbite-svelte';

    import {
		ChartPie,
		ViewGrid,
		InboxIn,
		User,
		Login,
		Cog,
		ShoppingBag,
		ShoppingCart,
		Table,
		Key
	} from 'svelte-heros';

    let spanClass =
		'pl-2 self-center text-lg font-semibold text-gray-900 whitespace-nowrap dark:text-white';

</script>




<Sidebar>
    <SidebarWrapper>
        <SidebarGroup>
            <SidebarItem
                label="Dashboard"
                icon={{ name: ChartPie, class: 'text-red-500 mr-2 dark:text-blue-500' }}
            />
            <SidebarDropdownWrapper
                label="My Cart"
                icon={{ name: ShoppingCart, class: 'text-blue-500 mr-2 dark:text-pink-500' }}
            >
                <SidebarDropdownItem label="Products" href="/cart"/>
                <SidebarDropdownItem label="Billing" />
                <SidebarDropdownItem label="Invoice" />
                <SidebarDropdownItem label="History" href="/order-history" />
            </SidebarDropdownWrapper>
            <SidebarItem
                label="Kanban"
                {spanClass}
                icon={{ name: ViewGrid, class: 'text-green-500 mr-2 dark:text-purple-500' }}
            >
                <svelte:fragment slot="subtext">
                    <span
                        class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
                        >Pro</span
                    >
                </svelte:fragment>
            </SidebarItem>
            <SidebarItem
                label="Inbox"
                {spanClass}
                icon={{ name: InboxIn, class: 'text-yellow-500 mr-2 dark:text-green-500' }}
            >
                <svelte:fragment slot="subtext">
                    <span
                        class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200"
                        >3</span
                    >
                </svelte:fragment>
            </SidebarItem>
            <SidebarItem
                label="Users"
                icon={{ name: User, class: 'text-blue-500 mr-2 dark:text-pink-500' }}
            />
            <SidebarItem
                label="Sign In"
                href="/login"
                icon={{ name: Login, class: 'text-green-500 mr-2 dark:text-yellow-500' }}
            />
            <SidebarItem
                label="Sign Up"
                href="/register"
                icon={{ name: Cog, class: 'text-pink-500 mr-2 dark:text-blue-500' }}
            />
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>