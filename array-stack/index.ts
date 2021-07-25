import * as readline from 'readline'

export class ArrayStack<T = any> {
  arr: T[]
  capacity: number
  n: number

  constructor(capacity: number) {
    this.capacity = capacity
    this.arr = Array.from({ length: capacity })
    this.n = -1
  }

  push(item: T) {
    if (this.n >= this.capacity - 1) {
      throw new Error('Stack is full')
    }
    this.arr[++this.n] = item
    console.log(this.n)
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('Stack is empty')
    }
    return this.arr[this.n--]
  }

  isEmpty(): boolean {
    return this.n === -1
  }
}

const stack = new ArrayStack<number>(5)

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
})

rl.on('SIGINT', () => {
  rl.close()
})
