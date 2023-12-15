type payload = string | number | object | unknown[]

interface socketMessage {
  method: string
  payload: payload
}

export default class MySocket {
  socket: WebSocket

  constructor(url: string) {
    this.socket = new WebSocket(url) // Create WebSocket connection.

    this.socket.onmessage = (event: { data: string }) => {
      const { method, payload }: socketMessage = JSON.parse(event.data)
      this.socket.dispatchEvent(new CustomEvent(`my_${method}`, { detail: payload }))
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
  on<T extends payload>(method: string, cb: (payload: T) => void): void {
    this.socket.addEventListener(`my_${method}`, ((e: CustomEvent) => {
      cb(e.detail)
    }) as EventListener)
  }
  send<T>(method: string, payload: T): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ method, payload }))
    }
  }
}
