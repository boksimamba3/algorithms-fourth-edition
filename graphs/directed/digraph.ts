import { Bag } from '../../fundamental-data-structures/bag'

export class Digraph {
  private vertices: number // vertices
  private edges: number // edges
  private adj: Bag<number>[] // adjacency list

  constructor(vertices: number) {
    this.vertices = vertices
    this.edges = 0
    this.adj = Array.from({ length: vertices })
    for (let v = 0; v < vertices; v++) {
      this.adj[v] = new Bag<number>()
    }
  }

  V(): number {
    return this.vertices
  }

  E(): number {
    return this.edges
  }

  addEdge(v: number, w: number): this {
    this.adj[v].add(w)
    this.edges++

    return this
  }

  adjacent(v: number): Iterable<number> {
    return this.adj[v]
  }

  reverse(): Digraph {
    const reverseDigraph = new Digraph(this.vertices)
    for (let v = 0; v < this.vertices; v++) {
      for (let w of this.adjacent(v)) {
        reverseDigraph.addEdge(w, v)
      }
    }

    return reverseDigraph
  }
}
