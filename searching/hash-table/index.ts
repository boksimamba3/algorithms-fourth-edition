import * as readline from 'readline'

export class DequeFullException extends Error {
  constructor(message: string = 'Deque is full') {
    super()
    this.message = message
  }
}
export class DequeEmptyException extends Error {
  constructor(message: string = 'Deque is empty') {
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

export class DequeIterator<TData = any> implements Iterator<TData> {
  private deque: Deque<TData>
  private length: number
  private current: number

  constructor(deque: Deque<TData>) {
    this.deque = deque
    this.length = deque.size
    this.current = 0
  }

  next(): IteratorResult<TData> {
    if (!this.length) {
      return {
        done: true,
        value: undefined,
      }
    }

    const data = this.deque.get(this.current)

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

export class Deque<TData> implements Iterable<TData> {
  private container: TData[]
  private head: number
  private tail: number
  private capacity: number
  public size: number

  constructor(capacity: number) {
    this.head = 0
    this.tail = 0
    this.size = 0
    this.capacity = capacity
    this.container = Array.from({ length: capacity })
  }

  isFull(): boolean {
    return this.size === this.capacity
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  front(): TData {
    if (this.isEmpty()) {
      throw new DequeEmptyException()
    }

    return this.container[this.head]
  }

  back(): TData {
    if (this.isEmpty()) {
      throw new DequeEmptyException()
    }

    return this.container[
      (this.tail - 1 + this.capacity) % this.capacity
    ]
  }

  get(index: number = 0): TData | null {
    if (index < 0 || index > this.size) {
      throw new IndexOutOfBounds()
    }
    const data = this.container[(this.head + index) % this.capacity]

    return data || null
  }

  insertFront(data: TData): this {
    if (this.isFull()) {
      throw new DequeFullException()
    }

    this.head = (this.head - 1 + this.capacity) % this.capacity
    this.container[this.head] = data
    this.size++

    return this
  }

  insertBack(data: TData): this {
    if (this.isFull()) {
      throw new DequeFullException()
    }
    this.container[this.tail] = data
    this.tail = (this.tail + 1) % this.capacity
    this.size++

    return this
  }

  deleteBack(): TData {
    if (this.isEmpty()) {
      throw new DequeEmptyException()
    }
    this.tail = (this.tail - 1 + this.capacity) % this.capacity
    const data = this.container[this.tail]
    this.size--

    return data
  }

  deleteFront(): TData {
    if (this.isEmpty()) {
      throw new DequeEmptyException()
    }
    const data = this.container[this.head]
    this.head = (this.head + 1) % this.capacity
    this.size--

    return data
  }

  [Symbol.iterator](): Iterator<TData> {
    return new DequeIterator(this)
  }
}

const deque = new Deque(5)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (input) => {
  if (input === '-') {
    console.log(deque.deleteFront())
  } else if (input === '--') {
    console.log(deque.deleteBack())
  } else if (input === 'p') {
    const output = []
    for (let data of deque) {
      output.push(data)
    }
    console.log(`[ ${output.join(', ')} ]`)
  } else {
    deque.insertFront(parseInt(input))
  }
})

rl.on('SIGINT', () => {
  rl.close()
})
