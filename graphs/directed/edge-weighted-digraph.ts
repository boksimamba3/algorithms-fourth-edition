import { Bag } from '../../fundamental-data-structures/bag'

export class DirectedEdge {
  private v: number
  private w: number
  private weight: number

  constructor(v: number, w: number, weight: number) {
    this.v = v
    this.w = w
    this.weight = weight
  }

  from(): number {
    return this.v
  }

  to(): number {
    return this.w
  }

  getWeight(): number {
    return this.weight
  }
}

export class EdgeWeightedDigraph {
  private vertices: number
  private edges: number
  private adj: Bag<DirectedEdge>[]

  constructor(vertices: number) {
    this.vertices = vertices
    this.edges = 0

    this.adj = Array.from({ length: this.vertices })
    for (let v = 0; v < this.vertices; v++) {
      this.adj[v] = new Bag()
    }
  }

  V(): number {
    return this.vertices
  }

  E(): number {
    return this.edges
  }

  addEdge(e: DirectedEdge): this {
    this.adj[e.from()].add(e)
    this.edges++

    return this
  }

  adjacent(v: number): Iterable<DirectedEdge> {
    return this.adj[v]
  }

  getEdges(): Iterable<DirectedEdge> {
    const bag = new Bag<DirectedEdge>()

    for (let v = 0; v < this.vertices; v++) {
      for (let e of this.adjacent(v)) {
        bag.add(e)
      }
    }

    return bag
  }
}
