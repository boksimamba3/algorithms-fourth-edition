import { ArrayStack } from '../../fundamental-data-structures/array-stack'
import { IndexMinPQ } from '../../sorting/index-min-priority-queue'
import {
  DirectedEdge,
  EdgeWeightedDigraph,
} from './edge-weighted-digraph'

export class DijkstraSP {
  private edgeTo: DirectedEdge[]
  private distTo: number[]
  private pq: IndexMinPQ<number>

  constructor(
    edgeWeightedDigraph: EdgeWeightedDigraph,
    source: number
  ) {
    this.edgeTo = Array.from({ length: edgeWeightedDigraph.V() })
    this.distTo = Array.from({ length: edgeWeightedDigraph.V() })
    this.pq = new IndexMinPQ<number>(
      edgeWeightedDigraph.V(),
      (a, b) => a - b
    )

    for (let v = 0; v < edgeWeightedDigraph.V(); v++) {
      this.distTo[v] = Number.POSITIVE_INFINITY
    }
    this.distTo[source] = 0

    this.pq.insert(source, 0)
    while (!this.pq.isEmpty()) {
      this.relax(edgeWeightedDigraph, this.pq.delMin())
    }
  }

  private relax(edgeWeightedDigraph: EdgeWeightedDigraph, v: number) {
    for (let e of edgeWeightedDigraph.adjacent(v)) {
      const w = e.to()
      if (this.distTo[w] > this.distTo[v] + e.getWeight()) {
        this.distTo[w] = this.distTo[v] + e.getWeight()
        this.edgeTo[w] = e
        if (this.pq.contains(w)) this.pq.changeKey(w, this.distTo[w])
        else this.pq.insert(w, this.distTo[w])
      }
    }
  }

  getDistTo(v: number) {
    return this.distTo[v]
  }

  hasPathTo(v: number) {
    return this.distTo[v] < Number.POSITIVE_INFINITY
  }

  getPathTo(v: number): Iterable<DirectedEdge> {
    if (!this.hasPathTo(v)) return null

    const path = new ArrayStack()
    for (
      let e = this.edgeTo[v];
      Boolean(e);
      e = this.edgeTo[e.from()]
    ) {
      path.push(e)
    }

    return path
  }
}

const edgeWeightedDigraph = new EdgeWeightedDigraph(13)
edgeWeightedDigraph
  .addEdge(new DirectedEdge(4, 5, 0.35))
  .addEdge(new DirectedEdge(5, 4, 0.35))
  .addEdge(new DirectedEdge(4, 7, 0.37))
  .addEdge(new DirectedEdge(5, 7, 0.28))
  .addEdge(new DirectedEdge(7, 5, 0.28))
  .addEdge(new DirectedEdge(5, 1, 0.32))
  .addEdge(new DirectedEdge(0, 4, 0.38))
  .addEdge(new DirectedEdge(0, 2, 0.26))
  .addEdge(new DirectedEdge(7, 3, 0.39))
  .addEdge(new DirectedEdge(1, 3, 0.29))
  .addEdge(new DirectedEdge(2, 7, 0.34))
  .addEdge(new DirectedEdge(6, 2, 0.4))
  .addEdge(new DirectedEdge(3, 6, 0.52))
  .addEdge(new DirectedEdge(6, 0, 0.58))
  .addEdge(new DirectedEdge(6, 4, 0.93))

const dijkstraShortestPath = new DijkstraSP(edgeWeightedDigraph, 0)

for (let p of dijkstraShortestPath.getPathTo(1)) {
  console.log(p)
}
