import MySocket from './socket'
import {
  userList,
  phrase,
  words,
  candidateWords,
  type userInfo,
  type Phrases,
  type Words,
  iamhost,
  iammaster,
  stateMachine,
  selected
} from '../store'

const nick = 'test' //prompt("Insert Nickname")
const x = new MySocket(`ws://localhost:3000?nick=${nick}`)

const test = () => {
  console.log('Error')
}
x.onerror(test)
x.onclose(test)

await x.onopen()

interface round {
  phrase: Phrases
  cards: Words[]
}

x.on<round>('nextManche', payload => {
  iammaster.set(false)
  nextManche(payload)
})
x.on<round>('nextMancheMaster', payload => {
  iammaster.set(true)
  nextManche(payload)
})
function nextManche(payload: round) {
  phrase.set(payload.phrase)
  words.set(payload.cards)
  stateMachine.set(1)
  selected.set(new Set())
}

x.on('choseWinner', (payload: Words[][]) => {
  stateMachine.set(2)
  candidateWords.set(payload)
})
x.on('waitChoseWinner', (payload: Words[][]) => {
  stateMachine.set(2)
  candidateWords.set(payload)
})

x.on<userInfo[]>('points', n => {
  userList.set(n)
})

x.on<userInfo[]>('youAreHost', () => {
  iamhost.set(true)
})

x.on('error', e => {
  console.log(e)
})

export const start = () => {
  x.send<number>('start', 0)
}
export const choseCards = (n: number[]) => {
  x.send<number[]>('choseCards', n)
}
export const choseWinner = (n: number) => {
  x.send<number>('choseWinner', n)
}
