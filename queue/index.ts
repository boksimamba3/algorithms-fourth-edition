import * as readline from 'readline'

export class Node<T> {
  next: Node<T> | null
  value: T

  constructor(value: T) {
    this.value = value
  }
}

export class Queue<T> {
  private head: Node<T> | null
  private tail: Node<T> | null
  private length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  isEmpty() {
    return this.head === null
  }

  size() {
    return this.length
  }

  enqueue(value: T) {
    let oldTail = this.tail
    this.tail = new Node(value)
    this.tail.next = null
    if (this.isEmpty()) {
      this.head = this.tail
    } else {
      oldTail.next = this.tail
    }
    this.length++
  }

  dequeue(): T {
    if (this.isEmpty()) {
      return
    }
    const value = this.head.value
    this.head = this.head.next
    this.length--
    if (this.isEmpty()) {
      this.tail = null
    }

    return value
  }
}

const queue = new Queue<number>()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (input) => {
  if (input === '-') {
    const value = queue.dequeue()
    console.log(value)
  } else {
    queue.enqueue(parseInt(input))
  }
})

rl.on('SIGINT', () => {
  rl.close()
})
