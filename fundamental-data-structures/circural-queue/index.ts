import * as readline from 'readline'

class QueueFullException extends Error {
  constructor(message: string = 'Queue is full') {
    super()
    this.message = message
  }
}
class QueueEmptyException extends Error {
  constructor(message: string = 'Queue is empty') {
    super()
    this.message = message
  }
}
class IndexOutOfBounds extends Error {
  constructor(message: string = 'Index out of bounds') {
    super()
    this.message = message
  }
}

export class CircularQueueIterator<TData = any>
  implements Iterator<TData>
{
  private circularQueue: CircularQueue<TData>
  private length: number
  private current: number

  constructor(circularQueue: CircularQueue<TData>) {
    this.circularQueue = circularQueue
    this.length = this.circularQueue.size()
    this.current = 0
  }

  next(): IteratorResult<TData> {
    if (this.length === 0) {
      return {
        done: true,
        value: undefined,
      }
    }

    const data = this.circularQueue.peek(this.current)

    if (!data) {
      return {
        done: true,
        value: undefined,
      }
    }

    this.length--
    this.current++

    return {
      done: false,
      value: data,
    }
  }
}

export class CircularQueue<TData> implements Iterable<TData> {
  private container: TData[]
  private capacity: number
  private _size: number
  private head: number
  private tail: number

  constructor(capacity: number) {
    this.capacity = capacity
    this._size = 0
    this.head = 0
    this.tail = 0
    this.container = []
  }

  private isFull() {
    return this._size === this.capacity
  }

  private isEmpty() {
    return this._size === 0
  }

  peek(index: number = 0): TData | null {
    if (index < 0 || index > this.size()) {
      throw new IndexOutOfBounds()
    }
    const data = this.container[(this.head + index) % this.capacity]

    return data ? data : null
  }

  enqueue(data: TData) {
    if (this.isFull()) {
      throw new QueueFullException()
    }
    this.container[this.tail] = data
    this._size++
    this.tail = ++this.tail % this.capacity
  }

  dequeue(): TData {
    if (this.isEmpty()) {
      throw new QueueEmptyException()
    }
    const data = this.container[this.head]
    this._size--
    this.head = ++this.head % this.capacity

    return data
  }

  size() {
    return this._size
  }

  [Symbol.iterator](): Iterator<TData> {
    return new CircularQueueIterator(this)
  }
}

const circularQueue = new CircularQueue(5)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (input) => {
  if (input === '-') {
    console.log(circularQueue.dequeue())
  } else if (input === 'p') {
    const output = []
    for (let data of circularQueue) {
      output.push(data)
    }
    console.log(`[ ${output.join(', ')} ]`)
  } else {
    circularQueue.enqueue(parseInt(input))
  }
})

rl.on('SIGINT', () => {
  rl.close()
})
