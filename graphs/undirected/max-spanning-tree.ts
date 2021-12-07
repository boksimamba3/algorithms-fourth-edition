interface Comparable<T> {
  compareTo(that: T): number
}

export class Edge implements Comparable<Edge> {
  private v: number
  private w: number
  private weight: number

  constructor(v: number, w: number, weight: number) {
    this.v = v
    this.w = w
    this.weight = weight
  }

  getWeight(): number {
    return this.weight
  }

  either(): number {
    return this.v
  }

  other(vertex: number) {
    if (vertex === this.v) return this.w
    if (vertex === this.w) return this.v
    throw new Error('Invalid argument exception')
  }

  compareTo(that: Edge) {
    if (this.getWeight() < that.getWeight()) return -1
    if (this.getWeight() > that.getWeight()) return 1
    return 0
  }
}

export class PrimMST {
  private edgeTo: Edge[]
  private distTo: number[]
  private marked: boolean[]
}
