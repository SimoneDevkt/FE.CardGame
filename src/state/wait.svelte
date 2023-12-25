<script lang="ts">
  import { Button } from 'flowbite-svelte'
  import { iamhost } from '../store'
  import { start } from '../game/game'

</script>

<div class="">
    {#if $iamhost}
    <div><Button class="h-12" on:click={()=>start()}>start</Button></div>          
    {:else}
        Wait Host
    {/if}
</div>
  