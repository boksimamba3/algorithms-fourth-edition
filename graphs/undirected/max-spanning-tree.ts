import { Queue } from '../../fundamental-data-structures/queue'
import { IndexMinPQ } from '../../sorting/index-min-priority-queue'
import { Edge, EdgeWeightedGraph } from './edge-weighted-graph'

export class PrimMST {
  private edgeTo: Edge[]
  private distTo: number[]
  private marked: boolean[]
  private pq: IndexMinPQ<number>

  constructor(graph: EdgeWeightedGraph) {
    this.marked = Array.from<boolean>({ length: graph.V() }).fill(
      false
    )
    this.edgeTo = Array.from({ length: graph.V() })
    this.distTo = Array.from({ length: graph.V() })
    this.pq = new IndexMinPQ(
      graph.V(),
      (a: number, b: number) => a - b
    )

    for (let v = 0; v < graph.V(); v++) {
      this.distTo[v] = Number.POSITIVE_INFINITY
    }

    for (let v = 0; v < graph.V(); v++) {
      // run from each vertex to find
      if (!this.marked[v]) this.prim(graph, v) // minimum spanning forest
    }
  }

  edges(): Iterable<Edge> {
    const mst = new Queue<Edge>()
    for (let v = 0; v < this.edgeTo.length; v++) {
      const e = this.edgeTo[v]
      if (e != null) {
        mst.enqueue(e)
      }
    }
    return mst
  }

  weight() {
    let weight = 0.0
    for (const e of this.edges()) {
      weight += e.getWeight()
    }

    return weight
  }

  private prim(graph: EdgeWeightedGraph, s: number) {
    this.distTo[s] = 0.0
    this.pq.insert(s, this.distTo[s])
    while (!this.pq.isEmpty()) {
      const v = this.pq.delMin()
      this.scan(graph, v)
    }
  }

  private scan(graph: EdgeWeightedGraph, v: number) {
    this.marked[v] = true
    for (const e of graph.adjacent(v)) {
      const w = e.other(v)
      if (this.marked[w]) continue // v-w is obsolete edge
      if (e.getWeight() < this.distTo[w]) {
        this.distTo[w] = e.getWeight()
        this.edgeTo[w] = e
        if (this.pq.contains(w))
          this.pq.decreaseKey(w, this.distTo[w])
        else this.pq.insert(w, this.distTo[w])
      }
    }
  }
}
