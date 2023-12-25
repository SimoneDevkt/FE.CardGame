import { writable, type Writable } from 'svelte/store'

export interface userInfo {
  points: number
  name: string
}

export const userList: Writable<userInfo[]> = writable([])

export type Phrases = string[]

export const phrase: Writable<Phrases> = writable([])

export type Words = string
export const words: Writable<Words[]> = writable([])

export const candidateWords: Writable<Words[][]> = writable()

export const iamhost: Writable<boolean> = writable(false)
export const iammaster: Writable<boolean> = writable(false)

export const selected: Writable<Set<number>> = writable(new Set())

export const stateMachine: Writable<number> = writable(0)
