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
    this.pq = new IndexMinPQ<number>(
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

const ewg = new EdgeWeightedGraph(8)

ewg
  .addEdge(new Edge(4, 5, 0.35))
  .addEdge(new Edge(4, 7, 0.37))
  .addEdge(new Edge(5, 7, 0.28))
  .addEdge(new Edge(0, 7, 0.16))
  .addEdge(new Edge(1, 5, 0.32))
  .addEdge(new Edge(0, 4, 0.38))
  .addEdge(new Edge(2, 3, 0.17))
  .addEdge(new Edge(1, 7, 0.19))
  .addEdge(new Edge(0, 2, 0.26))
  .addEdge(new Edge(1, 2, 0.36))
  .addEdge(new Edge(1, 3, 0.29))
  .addEdge(new Edge(2, 7, 0.34))
  .addEdge(new Edge(6, 2, 0.4))
  .addEdge(new Edge(3, 6, 0.52))
  .addEdge(new Edge(6, 0, 0.58))
  .addEdge(new Edge(6, 4, 0.93))

const mst = new PrimMST(ewg)

for (let e of mst.edges()) {
  console.log(e)
}
