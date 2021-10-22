export type Nullable<T> = T | null

export class BinarySearchTreeIterator<Key = any, Value = any>
  implements Iterator<Value>
{
  private bst: BinarySearchTree<Key, Value>
  private stack: Node<Key, Value>[]

  constructor(bst: BinarySearchTree<Key, Value>) {
    this.bst = bst
    this.stack = []
    if (this.bst.root) {
      this.stack.push(this.bst.root)
    }
  }

  next(): IteratorResult<Value> {
    if (this.stack.length === 0) {
      return {
        done: true,
        value: undefined,
      }
    }

    const node = this.stack.pop()!
    if (node.right !== null) this.stack.push(node.right)
    if (node.left !== null) this.stack.push(node.left)

    return {
      done: false,
      value: node.value,
    }
  }
}

export class Node<Key, Value> {
  public left: Nullable<Node<Key, Value>>
  public right: Nullable<Node<Key, Value>>
  public size: number
  public key: Key
  public value: Value

  constructor(key: Key, value: Value, size: number) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    this.size = size
  }
}

export class BinarySearchTree<Key, Value> implements Iterable<Value> {
  public root: Nullable<Node<Key, Value>>
  public compare: (a: Key, b: Key) => number

  constructor(compare: (a: Key, b: Key) => number) {
    this.root = null
    this.compare = compare
  }

  public isEmpty(): boolean {
    return this.size() === 0
  }

  public size(): number {
    return this._size(this.root)
  }

  private _size(x: Nullable<Node<Key, Value>>): number {
    if (x === null) return 0
    return x.size
  }

  public contains(key: Key) {
    return this._get(this.root, key) !== null
  }

  public get(key: Key) {
    return this._get(this.root, key)
  }

  private _get(x: Nullable<Node<Key, Value>>, key: Key): Value | null {
    if (x === null) return null

    if (this.compare(key, x.key) < 0) {
      return this._get(x.left, key)
    }
    if (this.compare(key, x.key) > 0) {
      return this._get(x.right, key)
    }

    return x.value
  }

  public put(key: Key, value: Value) {
    this.root = this._put(this.root, key, value)
  }

  private _put(
    x: Node<Key, Value> | null,
    key: Key,
    value: Value
  ): Node<Key, Value> {
    if (x === null) return new Node(key, value, 1)
    if (this.compare(key, x.key) < 0) {
      x.left = this._put(x.left, key, value)
    } else if (this.compare(key, x.key) > 0) {
      x.right = this._put(x.right, key, value)
    } else {
      x.value = value
    }
    x.size = 1 + this._size(x.left) + this._size(x.right)
    return x
  }

  public min(): Nullable<Value> {
    if (this.isEmpty()) return null

    return this._min(this.root!).value
  }

  public _min(x: Node<Key, Value>): Node<Key, Value> {
    if (x.left === null) {
      return x
    }

    return this._min(x.left)
  }

  public max(): Nullable<Value> {
    if (this.isEmpty()) return null

    return this._max(this.root!).value
  }

  public _max(x: Node<Key, Value>): Node<Key, Value> {
    if (x.right === null) {
      return x
    }

    return this._max(x.right)
  }

  [Symbol.iterator](): Iterator<Value> {
    return new BinarySearchTreeIterator(this)
  }
}

interface User {
  username: string
  email: string
}

const bst = new BinarySearchTree<string, User>((a: string, b: string) =>
  a.localeCompare(b)
)

const users = [
  { username: 'john', email: 'john@mail.com' },
  { username: 'jane', email: 'jane@mail.com' },
  { username: 'janh', email: 'janh@mail.com' },
  { username: 'smokey', email: 'smokey@mail.com' },
  { username: 'quack', email: 'quack@mail.com' },
  { username: 'bart', email: 'bart@mail.com' },
]

for (let user of users) {
  bst.put(user.username, user)
}

for (let user of bst) {
  console.log(user)
}
