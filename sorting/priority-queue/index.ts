export type Comparator<T> = (a: T, b: T) => number

class PriorityQueueUnderflowError extends Error {
  constructor(msg: string = 'Priority queue underflow') {
    super()
    this.message = msg
  }
}

export class PQMin<T> {
  public pq: T[]
  private n: number
  private comparator: Comparator<T>

  constructor(capacity: number, comparator: Comparator<T>) {
    this.pq = Array.from({ length: capacity })
    this.n = 0
    this.comparator = comparator
  }

  public isEmpty(): boolean {
    return this.n === 0
  }

  public size(): number {
    return this.n
  }

  public min(): T {
    if (this.isEmpty()) throw new PriorityQueueUnderflowError()

    return this.pq[1]
  }

  public insert(x: T) {
    if (this.n == this.pq.length - 1) this.resize(2 * this.pq.length)

    this.pq[++this.n] = x
    this.swim(this.n)
  }

  public delMin() {
    if (this.isEmpty()) throw new PriorityQueueUnderflowError()

    const min = this.pq[1]
    this.exchange(1, this.n--)
    this.sink(1)
    if (this.n > 0 && this.n == (this.pq.length - 1) / 4)
      this.resize(this.pq.length / 2)

    return min
  }

  private resize(capacity: number) {
    const copy = Array.from<T>({ length: capacity })
    for (let i = 0; i < this.n; i++) {
      copy[i + 1] = this.pq[i + 1]
    }
    this.pq = copy
  }

  private exchange(i: number, j: number) {
    const swap = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = swap
  }

  private greater(i: number, j: number) {
    return this.comparator(this.pq[i], this.pq[j]) > 0
  }

  private swim(k: number) {
    while (k > 1 && this.greater(k / 2, k)) {
      this.exchange(k, k / 2)
      k = k / 2
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
}

const pqmin = new PQMin<number>(10, (a, b) => a - b)
pqmin.insert(5)
pqmin.insert(1)
pqmin.insert(10)
pqmin.insert(30)
pqmin.insert(20)

while (!pqmin.isEmpty()) {
  console.log(pqmin.delMin())
}
