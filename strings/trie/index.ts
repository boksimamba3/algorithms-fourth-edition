import { Queue } from '../../fundamental-data-structures/queue'

export type Nullable<T> = T | null
export type TrieNode<T> = Nullable<Node<T>>

export class Node<T> {
  value: Nullable<T>
  next: TrieNode<T>[]

  constructor(value: Nullable<T> = null, R: number = Trie.R) {
    this.value = value
    this.next = Array.from<TrieNode<T>>({ length: R }).fill(null)
  }
}

export class Trie<T> {
  static readonly R = 256
  root: TrieNode<T>

  constructor() {
    this.root = new Node<T>()
  }

  private get(key: string) {
    const x = this._get(this.root, key, 0)

    if (x === null) return null

    return x.value
  }

  private _get(x: TrieNode<T>, key: string, d: number): TrieNode<T> {
    if (x === null) return null
    if (d === key.length) return x

    const c = key.charCodeAt(d)

    return this._get(x.next[c], key, d + 1)
  }

  put(key: string, value: T): this {
    this.root = this._put(this.root, key, value, 0)

    return this
  }

  private _put(
    x: TrieNode<T>,
    key: string,
    value: T,
    d: number
  ): TrieNode<T> {
    if (x === null) x = new Node<T>()
    if (d === key.length) {
      x.value = value
      return x
    }
    const c = key.charCodeAt(d)
    x.next[c] = this._put(x.next[c], key, value, d + 1)

    return x
  }

  keys(): Iterable<string> {
    const queue = new Queue<string>()
    this._keys(this.root, '', queue)
    return queue
  }

  private _keys(x: Node<T>, prefix: string, queue: Queue<string>) {
    if (x === null) return
    if (x.value !== null) queue.enqueue(prefix)
    for (let c = 0; c < Trie.R; c++) {
      this._keys(x.next[c], prefix + String.fromCharCode(c), queue)
    }
  }

  delete(key: string) {
    this.root = this._delete(this.root, key, 0)
  }

  private _delete(x: TrieNode<T>, key, d): TrieNode<T> {
    if (x === null) return null
    if (d === key.length) {
      x.value = null
    } else {
      const c = key.charCodeAt(d)
      x.next[c] = this._delete(x.next[c], key, d + 1)
    }

    if (x.value !== null) return x

    for (let c = 0; c < Trie.R; c++) {
      if (x.next[c] !== null) return x
    }

    return null
  }
}
