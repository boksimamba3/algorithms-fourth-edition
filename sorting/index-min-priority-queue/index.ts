export type Comparator<T> = (a: T, b: T) => number

class NoSuchElementError extends Error {
  constructor(msg: string = 'Index is not in the priority queue') {
    super()
    this.message = msg
  }
}

class IllegalArgumentError extends Error {
  constructor(msg: string = 'IllegalArgumentError') {
    super()
    this.message = msg
  }
}

class PriorityQueueUnderflowError extends Error {
  constructor(msg: string = 'Priority queue underflow') {
    super()
    this.message = msg
  }
}

export class IndexMinPQ<Key> {
  private maxN: number // maximum number of elements on PQ
  private n: number // number of elements on PQ
  private pq: number[] // binary heap using 1-based indexing
  private qp: number[] // inverse of pq - qp[pq[i]] = pq[qp[i]] = i
  private keys: Key[] // keys[i] = priority of i
  private comparator: Comparator<Key>

  constructor(maxN: number, comparator: Comparator<Key>) {
    this.maxN = maxN
    this.n = 0
    this.keys = Array.from({ length: this.maxN + 1 })
    this.pq = Array.from({ length: this.maxN + 1 })
    this.qp = Array.from({ length: this.maxN + 1 })
    this.comparator = comparator
    for (let i = 0; i <= maxN; i++) {
      this.qp[i] = -1
    }
  }

  isEmpty(): boolean {
    return this.n === 0
  }

  contains(i: number): boolean {
    return this.qp[i] != -1
  }

  size(): number {
    return this.n
  }

  insert(i: number, key: Key) {
    if (this.contains(i)) {
      throw new IllegalArgumentError(
        'Index is already in the priority queue'
      )
    }

    this.n++
    this.qp[i] = this.n
    this.pq[this.n] = i
    this.keys[i] = key
    this.swim(this.n)
  }

  minKey(): Key {
    if (this.n == 0) throw new PriorityQueueUnderflowError()
    return this.keys[this.pq[1]]
  }

  delMin(): number {
    if (this.n == 0) throw new PriorityQueueUnderflowError()
    const min = this.pq[1]
    this.exchange(1, this.n--)
    this.sink(1)
    this.qp[min] = -1 // delete
    this.keys[min] = null // to help with garbage collection
    this.pq[this.n + 1] = -1 // not needed

    return min
  }

  keyOf(i: number): Key {
    if (!this.contains(i)) throw new NoSuchElementError()

    return this.keys[i]
  }

  changeKey(i: number, key: Key) {
    if (!this.contains(i)) throw new NoSuchElementError()
    this.keys[i] = key
    this.swim(this.qp[i])
    this.sink(this.qp[i])
  }

  delete(i: number) {
    if (!this.contains(i)) throw new NoSuchElementError()
    const index = this.qp[i]
    this.exchange(index, this.n--)
    this.swim(index)
    this.sink(index)
    this.keys[i] = null
    this.qp[i] = -1
  }

  private swim(k: number) {
    while (k > 1 && this.greater(Math.floor(k / 2), k)) {
      this.exchange(k, Math.floor(k / 2))
      k = Math.floor(k / 2)
    }
  }

  private sink(k: number) {
    while (2 * k <= this.n) {
      let j = 2 * k
      if (j < this.n && this.greater(j, j + 1)) j++
      if (!this.greater(k, j)) break
      this.exchange(k, j)
      k = j
    }
  }

  private exchange(i: number, j: number) {
    const swap = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = swap
  }

  private greater(i: number, j: number) {
    return (
      this.comparator(this.keys[this.pq[i]], this.keys[this.pq[j]]) >
      0
    )
  }
}

const words = ['John', 'Jane', 'Paul', 'Mark', 'Steve', 'Ann', 'Rob']

const pq = new IndexMinPQ<string>(
  words.length,
  (a: string, b: string) => a.localeCompare(b)
)
for (let i = 0; i < words.length; i++) {
  pq.insert(i, words[i])
}

while (!pq.isEmpty()) {
  const i = pq.delMin()
  console.log(i + ' ' + words[i])
}
