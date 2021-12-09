import { Bag } from '../../fundamental-data-structures/bag'

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

  other(vertex: number): number {
    if (vertex === this.v) return this.w
    if (vertex === this.w) return this.v
    throw new Error('Invalid argument exception')
  }

  compareTo(that: Edge): number {
    if (this.getWeight() < that.getWeight()) return -1
    if (this.getWeight() > that.getWeight()) return 1
    return 0
  }
}

export class EdgeWeightedGraph {
  private vertices: number // vertices
  private edges: number // edges
  private adj: Bag<Edge>

  constructor(vertices: number) {
    this.vertices = vertices
    this.edges = 0
    this.adj = new Bag()

    for (let v = 0; v < this.vertices; v++) {
      this.adj[v] = new Bag<Edge>()
    }
  }

  V(): number {
    return this.vertices
  }

  E(): number {
    return this.edges
  }

  addEdge(e: Edge): this {
    const v = e.either()
    const w = e.other(v)
    this.adj[v].add(e)
    this.adj[w].add(e)
    this.edges++

    return this
  }

  degree(v: number): number {
    return this.adj[v].size()
  }

  adjacent(v: number): Iterable<Edge> {
    return this.adj[v]
  }

  getEdges(): Iterable<Edge> {
    const list = new Bag<Edge>()
    for (let v = 0; v < this.vertices; v++) {
      let selfLoops = 0
      for (const e of this.adjacent(v)) {
        if (e.other(v) > v) {
          list.add(e)
        } else if (e.other(v) == v) {
          if (selfLoops % 2 == 0) list.add(e)
          selfLoops++
        }
      }
    }

    return list
  }
}
