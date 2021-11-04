import { LinkedList } from '../../fundamental-data-structures/linked-list'

export class Entry<Key extends string, Value> {
  public key: Key
  public value: Value

  constructor(key: Key, value: Value) {
    this.key = key
    this.value = value
  }
}

// Hash table with separate chaining hash
export class HashTable<Key extends string, Value> {
  private m: number
  private container: LinkedList<Entry<Key, Value>>[]

  constructor(m: number = 997) {
    this.m = m
    this.container = Array.from({ length: m })

    for (let i = 0; i < m; i++) {
      this.container[i] = new LinkedList<Entry<Key, Value>>()
    }
  }

  get(key: Key): Value | null {
    const found = this.container[this.hash(key)].find(
      (data) => data.key === key
    )

    return found ? found.value : null
  }

  put(key: Key, value: Value) {
    this.container[this.hash(key)].push(new Entry(key, value))
  }

  private hash(key: Key): number {
    let hash = 0
    if (key.length == 0) return hash

    for (let i = 0; i < key.length; i++) {
      let char = key.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }

    return hash % this.m
  }
}
