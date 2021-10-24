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
  }

  private _put(
    x: Node<Key, Value> | null,
    key: Key,
    value: Value
  ): Node<Key, Value> {
    if (x === null) return new Node(key, value, 1)
    const cmp = this.compare(key, x.key)
    if (cmp < 0) {
      x.left = this._put(x.left, key, value)
    } else if (cmp > 0) {
      x.right = this._put(x.right, key, value)
    } else {
      x.value = value
    }
    x.size = 1 + this._size(x.left) + this._size(x.right)
    return x
  }

  public floor(key: Key): Key {
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

  public ceil(key: Key): Key {
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

    this.root = this._deleteMin(this.root)
  }

  private _deleteMin(x: Nullable<Node<Key, Value>>) {
    if (x.left === null) {
      return x.right
    }
    x.left = this._deleteMin(x.left)
    x.size = 1 + this._size(x.left) + this._size(x.right)

    return x
  }

  public deleteMax() {
    if (this.isEmpty()) return null
    this.root = this._deleteMax(this.root)
  }

  private _deleteMax(
    x: Nullable<Node<Key, Value>>
  ): Nullable<Node<Key, Value>> {
    if (x.right === null) {
      return x.left
    }
    x.right = this._deleteMin(x.left)
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
      x = this._min(temp.right)
      x.right = this._deleteMin(temp.right)
      x.left = temp.left
    }
    x.size = 1 + this._size(x.left) + this._size(x.right)

    return x
  }

  [Symbol.iterator](): Iterator<Value> {
    return new BinarySearchTreeIterator(this)
  }
}

const bst = new BinarySearchTree<number, number>(
  (a: number, b: number) => a - b
)

bst.put(7, 7)
bst.put(10, 10)
bst.put(12, 12)
bst.put(4, 4)
bst.put(6, 6)

console.log(bst.ceil(10))
console.log(bst.ceil(11))
console.log(bst.floor(5))
