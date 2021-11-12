import * as readline from 'readline'

export type Nullable<T> = T | null

const RED = true
const BLACK = false
type Color = typeof RED | typeof BLACK

export class RedBlackTreeIterator<Key = any, Value = any>
  implements Iterator<Value>
{
  private rbt: RedBlackTree<Key, Value>
  private stack: Node<Key, Value>[]

  constructor(rbt: RedBlackTree<Key, Value>) {
    this.rbt = rbt
    this.stack = []
    if (this.rbt.root) {
      this.stack.push(this.rbt.root)
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
  public color: Color

  constructor(key: Key, value: Value, color = RED) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    this.size = 1
    this.color = color
  }
}

export class RedBlackTree<Key, Value> implements Iterable<Value> {
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

  private _get(
    x: Nullable<Node<Key, Value>>,
    key: Key
  ): Value | null {
    if (x === null) return null
    const cmp = this.compare(key, x.key)
    if (cmp < 0) {
      return this._get(x.left, key)
    }
    if (cmp > 0) {
      return this._get(x.right, key)
    }

    return x.value
  }

  public put(key: Key, value: Value) {
    this.root = this._put(this.root, key, value)
    this.root.color = BLACK
  }

  private _put(
    x: Node<Key, Value> | null,
    key: Key,
    value: Value
  ): Node<Key, Value> {
    if (x === null) return new Node(key, value)
    const cmp = this.compare(key, x.key)
    if (cmp < 0) {
      x.left = this._put(x.left, key, value)
    } else if (cmp > 0) {
      x.right = this._put(x.right, key, value)
    } else {
      x.value = value
    }

    if (this.isRed(x.right) && !this.isRed(x.left))
      x = this.rotateLeft(x)
    if (this.isRed(x.left) && this.isRed(x.left!.left))
      x = this.rotateRight(x)
    if (this.isRed(x.left) && this.isRed(x.right)) this.flipColors(x)
    x.size = 1 + this._size(x.left) + this._size(x.right)

    return x
  }

  public floor(key: Key): Key | undefined {
    const x = this._floor(this.root, key)
    if (x === null) return

    return x.key
  }

  private _floor(
    x: Nullable<Node<Key, Value>>,
    key: Key
  ): Nullable<Node<Key, Value>> {
    if (x === null) return null
    const cmp = this.compare(key, x.key)
    if (cmp === 0) return x
    if (cmp < 0) return this._floor(x.left, key)

    const temp = this._floor(x.right, key)
    if (temp !== null) return temp

    return x
  }

  public ceil(key: Key): Key | undefined {
    const x = this._ceil(this.root, key)
    if (x === null) return
    return x.key
  }

  private _ceil(
    x: Nullable<Node<Key, Value>>,
    key: Key
  ): Nullable<Node<Key, Value>> {
    if (x === null) return null
    const cmp = this.compare(key, x.key)
    if (cmp === 0) return x
    if (cmp > 0) return this._ceil(x.right, key)

    const temp = this._ceil(x.left, key)
    if (temp !== null) return temp

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

  public deleteMin() {
    if (this.isEmpty()) return

    this.root = this._deleteMin(this.root!)
  }

  private _deleteMin(x: Node<Key, Value>) {
    if (x.left === null) {
      return x.right
    }
    x.left = this._deleteMin(x.left)
    x.size = 1 + this._size(x.left) + this._size(x.right)

    return x
  }

  public deleteMax() {
    if (this.isEmpty()) return null
    this.root = this._deleteMax(this.root!)
  }

  private _deleteMax(
    x: Node<Key, Value>
  ): Nullable<Node<Key, Value>> {
    if (x.right === null) {
      return x.left
    }
    x.right = this._deleteMin(x.left!)
    x.size = 1 + this._size(x.left) + this._size(x.right)

    return x
  }

  public delete(key: Key) {
    if (this.isEmpty()) return

    this.root = this._delete(this.root, key)
  }

  private _delete(
    x: Nullable<Node<Key, Value>>,
    key: Key
  ): Nullable<Node<Key, Value>> {
    if (x === null) {
      return null
    }
    const cmp = this.compare(key, x.key)
    if (cmp < 0) {
      x.left = this._delete(x.left, key)
    } else if (cmp > 0) {
      x.right = this._delete(x.right, key)
    } else {
      if (x.left === null) return x.right
      if (x.right === null) return x.left

      const temp = x
      x = this._min(temp.right!)
      x.right = this._deleteMin(temp.right!)
      x.left = temp.left
    }
    x.size = 1 + this._size(x.left) + this._size(x.right)

    return x
  }

  // Helpers to balance the tree
  private isRed(x: Nullable<Node<Key, Value>>): boolean {
    return x !== null ? x.color === RED : false
  }

  private rotateLeft(x: Node<Key, Value>) {
    const n = x.right!
    x.right = n.left
    n.left = x
    n.color = x.color
    x.color = RED
    n.size = x.size
    x.size = 1 + this._size(x.left!) + this._size(x.right)
    return n
  }

  private rotateRight(x: Node<Key, Value>) {
    const n = x.left!
    x.left = n.right
    n.right = x
    n.color = x.color
    x.color = RED
    n.size = x.size
    x.size = 1 + this._size(x.left!) + this._size(x.right)

    return n
  }

  private flipColors(x: Node<Key, Value>) {
    x.color = RED
    x.left!.color = BLACK
    x.right!.color = BLACK
  }

  [Symbol.iterator](): Iterator<Value> {
    return new RedBlackTreeIterator(this)
  }
}

/* const rbt = new RedBlackTree<string, string>((a: string, b: string) =>
  a.localeCompare(b)
)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (line) => {
  if (line === '-') {
    rbt.delete(line)
  } else if (line === 'print') {
    const output = []
    for (let elem of rbt) {
      output.push(elem)
    }
    console.log(`[ ${output.join(', ')} ]`)
  } else if (line === 'size') {
    console.log('Size: ', rbt.size())
  } else {
    rbt.put(line, line)
  }
})

rl.on('SIGINT', () => {
  rl.close()
}) */
