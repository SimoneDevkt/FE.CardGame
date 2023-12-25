<script lang="ts">

  import { Card } from "flowbite-svelte"
  import { choseWinner } from "../game/game"
  import { candidateWords, iammaster, phrase, type Words } from "../store"


  function getPhrase(word: Words[]) {    
    let i = 0
    return $phrase.reduce((pre, cur) => pre + (cur === '' ? word[i++] : cur), '')
  }

</script>

{#if $iammaster}
    Chose best card
{:else}
    Wait master
{/if}
<div class="flex flex-wrap">
    {#each $candidateWords as words, id}    
        <Card on:click={() => choseWinner(id)} style="background-color: black" class="p-8 w-44 h-56">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{getPhrase(words)}</h5>
        </Card>
    {/each}
</div>
