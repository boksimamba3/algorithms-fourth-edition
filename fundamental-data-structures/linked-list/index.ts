export class Node<TData> {
  data: TData
  next: Node<TData> | null

  constructor(data: TData) {
    this.data = data
    this.next = null
  }
}

export class LinkedList<TData> {
  private head: Node<TData> | null
  private tail: Node<TData> | null
  private length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  isEmpty(): boolean {
    return this.head === null
  }

  len(): number {
    return this.length
  }

  push(data: TData): this {
    const node = new Node(data)
    if (this.isEmpty()) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.length++

    return this
  }

  pop(): Node<TData> | null {
    if (this.isEmpty()) return null

    if (this.head === this.tail) {
      const node = this.head
      this.head = null
      this.tail = null
      this.length = 0

      return node
    }

    let current = this.head
    let previous = current
    while (current.next) {
      previous = current
      current = current.next
    }
    this.tail = previous
    this.tail.next = null
    this.length--

    return current
  }

  unshift(data: TData): this {
    const node = new Node(data)
    if (this.isEmpty()) {
      this.head = node
      this.tail = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.length++

    return this
  }

  shift(): Node<TData> | null {
    if (this.isEmpty()) return null

    const current = this.head
    this.head = current.next
    this.length--

    return current
  }

  private getByIndex(index: number): Node<TData> | null {
    if (index < 0 || index >= this.length) return null
    let current = this.head
    while (current && index > 0) {
      current = current.next
      index--
    }

    return current
  }

  get(index: number): TData | null {
    const current = this.getByIndex(index)

    return current ? current.data : null
  }

  set(index: number, value: TData): this {
    const current = this.getByIndex(index)
    if (current) current.data = value

    return this
  }

  insert(index: number, data: TData): boolean {
    if (index < 0 || index > this.length) return false
    if (index === 0) return !!this.unshift(data)
    else if (index === this.length) return !!this.push(data)
    else {
      const node = new Node(data)
      const previous = this.getByIndex(index - 1)
      node.next = previous.next
      previous.next = node
      this.length++

      return true
    }
  }

  remove(index: number): Node<TData> | null {
    if (index < 0 || index > this.length) return null
    if (index === 0) return this.shift()
    else if (index === this.length - 1) return this.pop()
    else {
      const previous = this.getByIndex(index - 1)
      const current = previous.next
      previous.next = current.next
      this.length--

      return current
    }
  }

  public find(compare: (TData) => boolean): TData | null {
    let p = this.head

    while (p !== null) {
      if (compare(p.data)) {
        return p.data
      }

      p = p.next
    }

    return null
  }

  reverse(): this {
    let node = this.head
    this.head = this.tail
    this.tail = node
    let next
    let prev = null
    for (let i = 0; i < this.length; i++) {
      next = node.next
      node.next = prev
      prev = node
      node = next
    }

    return this
  }

  print() {
    let current = this.head
    while (current) {
      console.log(current.data)
      current = current.next
    }
  }

  *[Symbol.iterator]() {
    let current = this.head
    while (current) {
      yield current.data
      current = current.next
    }
  }
}
