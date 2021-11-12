export class Node<T> {
  data: T
  next: Node<T> | null

  constructor(data: T) {
    this.data = data
  }
}

export class Bag<T> {
  private head

  constructor() {
    this.head = null
  }

  add(data: T) {
    const oldHead = this.head
    const node = new Node(data)
    this.head = node
    node.next = oldHead
  }

  *[Symbol.iterator]() {
    let current = this.head
    while (current) {
      yield current.data
      current = current.next
    }
  }
}
