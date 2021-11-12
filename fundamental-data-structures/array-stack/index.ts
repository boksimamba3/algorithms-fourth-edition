import * as readline from 'readline'

export class ReverseStackIterator<T> implements Iterator<T> {
  private stack: ArrayStack<T>
  private n: number

  constructor(stack: ArrayStack<T>) {
    this.stack = stack
    this.n = stack.size() - 1
  }

  next() {
    return {
      done: this.n < 0,
      value: this.stack.arr[this.n--],
    }
  }
}

export class ArrayStack<T = any> implements Iterable<T> {
  arr: T[]
  n: number

  constructor(capacity: number = 10) {
    this.arr = Array.from({ length: capacity })
    this.n = 0
  }

  push(item: T) {
    if (this.n === this.arr.length) {
      this.resize(this.arr.length * 2)
    }
    this.arr[this.n++] = item
  }

  pop(): T {
    const item = this.arr[--this.n]
    this.arr[this.n] = undefined
    if (this.n > 0 && this.n === Math.floor(this.arr.length / 4)) {
      this.resize(this.arr.length / 2)
    }
    return item
  }

  resize(capacity: number) {
    const temp = Array.from<T>({ length: capacity })
    for (let i = 0; i < capacity; i++) {
      temp[i] = this.arr[i]
    }
    this.arr = temp
  }

  isEmpty(): boolean {
    return this.n === 0
  }

  size(): number {
    return this.n
  }

  [Symbol.iterator]() {
    return new ReverseStackIterator(this)
  }
}

/* const stack = new ArrayStack<number>(5)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (input) => {
  if (input === '-') {
    stack.pop()
  } else {
    stack.push(parseInt(input))
  }
  console.log(stack.arr)
})

rl.on('SIGINT', () => {
  rl.close()
}) */
