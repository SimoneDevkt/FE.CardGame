import MySocket from './socket'

const x = new MySocket('ws://localhost:3000')

const test = () => {
    console.log('Error')
}
x.onerror(test)

x.onclose(test)

await x.onopen()

x.onopen()

x.on<string>('message1', string1 => {
    console.log(string1)
})

x.send<number>('message2', 3)

x.onclose(err => {
    console.log(err)
})
