import { Bag } from '../fundamental-data-structures/bag'

export class Graph {
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

  public V() {
    return this.vertices
  }

  public E() {
    return this.edges
  }

  public addEdge(v: number, w: number) {
    this.adj[v].add(w)
    this.adj[w].add(v)
    this.edges++
  }

  public adjacent(v: number) {
    return this.adj[v]
  }
}
