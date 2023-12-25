<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import { DarkMode } from 'flowbite-svelte';

  import { Listgroup, ListgroupItem, Avatar  } from 'flowbite-svelte';

  import { stateMachine, userList } from './store';
  import { Navbar, NavBrand } from 'flowbite-svelte';
  import Wait from './state/wait.svelte'
  import ChoseCards from './state/choseCards.svelte'
  import ChoseWinner from './state/choseWinner.svelte'

</script>

<main>
  <!-- dir = ltr or rtl -->
  <div dir="ltr"  class="w-screen relative px-8">
    <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
      <NavBrand href="/">
        <img src={svelteLogo} class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">CAH</span>
      </NavBrand>
      <DarkMode/>
    </Navbar>
    <div class="flex mt-16  overflow-scroll">
      <div class="w-5/6">      
        {#if $stateMachine === 0}
          <Wait></Wait>          
        {/if}    
        {#if $stateMachine === 1}
          <ChoseCards></ChoseCards>
        {/if}    
        {#if $stateMachine === 2}
          <ChoseWinner></ChoseWinner>
        {/if}
      </div>
      <div class="w-1/6 min-w-52">
          <div>
            <h1>CAH</h1>
          </div>
          <div>    
            <div class="p-2">
              <Listgroup active class="w-48">
                <h3 class="p-1 text-center text-xl font-medium text-gray-900 dark:text-white">User list</h3>
              
                {#each $userList as item}
                <ListgroupItem class="text-base font-semibold gap-2">
                  {item.points}<Avatar src={viteLogo} size="xs" />{item.name}
                </ListgroupItem>
                {/each}
              </Listgroup>
            </div>
          </div> 
      </div>
    </div>  
  </div>
</main>

<style>
</style>
