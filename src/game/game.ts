import MySocket from './socket'

const nick = "test" //prompt("Insert Nickname")
const x = new MySocket(`ws://localhost:3000?nick=${nick}`)

const test = () => {
  console.log('Error')
}
x.onerror(test)
x.onclose(test)

await x.onopen()

export interface Phrases {
  phrase: string[]
}

export interface Words {
  word: string
}

x.on('nextManche', (string1: {
  phrase: Phrases;
  cards: Words[];
}) => {
  console.log('nextManche', string1)
})
x.on('nextMancheMaster', (string1: {
  phrase: Phrases;
  cards: Words[];
}) => {
  console.log('nextMancheMaster', string1)
})


x.on('choseWinner', (string1: Words[][]) => {
  console.log('choseWinner', string1)
})
x.on('waitChoseWinner', (string1: Words[][]) => {
  console.log('waitChoseWinner', string1)
})

x.on('points', n => {
  console.log(n)
})

x.on('error', e => {
  console.log(e)
})


export const ciao = {
  start: () => {    
    x.send<number>('start', 0)
  },
  choseCards: (n: number[]) => {    
    x.send<number[]>('choseCards', n)
  },
  choseWinner: (n: number) => {    
    x.send<number>('choseWinner', n)
  }
}

