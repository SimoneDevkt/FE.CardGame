<script lang="ts">
    import { Button, Card } from 'flowbite-svelte'
    import { iammaster, phrase, selected, words, type Phrases } from '../store'
    import { choseCards } from '../game/game'


    function clickCard(id: number){
        const maxWord = $phrase.reduce( (acc, c) => acc + (c === '' ? 1 : 0), 0)
        if( !$selected.has(id) && ($selected.size + 1) > maxWord){
            return
        }
        
        $selected.has(id) ? $selected.delete(id) : $selected.add(id)

        $selected = $selected
        $phrase = $phrase
    }
    function getWordOrSpace(n:number){    
        const space = '____________'  
        if([...$selected][n]){
            return $words[[...$selected][n]]
        }
        return space
    }

    function getPhrase(phrase: Phrases) {
        let i = 0
        return phrase.reduce((pre, cur) => pre + (cur === '' ? getWordOrSpace(i++) : cur), '')
	}
  
  </script>
  
  <Card style="background-color: black" class="p-8 w-44 h-56">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{getPhrase($phrase)}</h5>
  </Card>
  {#if $iammaster}
    wait player chose card
  {:else}      
    <div><Button class="h-12" on:click={()=>choseCards([...$selected])}>choseCards</Button></div>
    <div class="flex flex-wrap">
      {#each $words as word, id}
      <Card on:click={() => clickCard(id)} style="background-color: {$selected.has(id) ? 'red' : 'white'}" class="p-8 w-44 h-56">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 white:text-dark">{word}</h5>
      </Card>
      {/each}
    </div>
  {/if}
    