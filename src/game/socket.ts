/* eslint-disable @typescript-eslint/no-explicit-any */
type payload = string | number | object | any[]

interface socketMessage {
    method: string
    payload: payload
}

export default class MySocket {
    socket: WebSocket
    messages = new Map<string, (data: any) => void>()

    constructor(url: string) {
        this.socket = new WebSocket(url) // Create WebSocket connection.

        this.socket.onmessage = (event: { data: string }) => {
            const { method, payload }: socketMessage = JSON.parse(event.data)
            const cb = this.messages.get(method)
            if (cb) {
                cb(payload)
            }
        }
    }
    get webSocket(): WebSocket {
        return this.socket
    }
    onopen() {
        return new Promise((resolve, reject) => {
            this.socket.onopen = resolve
            this.socket.onerror = reject
        })
    }
    onerror<T>(cb: (ev: Event) => T) {
        this.socket.onerror = cb
    }

    onclose(cb: (ev: CloseEvent) => void) {
        this.socket.onclose = cb
    }
    on<T extends payload>(str: string, cb: (payload: T) => void): void {
        this.messages.set(str, cb)
    }
    send<T>(method: string, payload: T): void {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ method, payload }))
        }
    }
}
