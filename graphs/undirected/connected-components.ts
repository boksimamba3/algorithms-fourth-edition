import { Graph } from './graph'

export class ConnectedComponents {
  private marked: boolean[]
  private id: number[]
  private count: number

  constructor(graph: Graph) {
    this.marked = Array.from<boolean>({ length: graph.V() }).fill(
      false
    )
    this.id = Array.from({ length: graph.V() })
    this.count = 0
    for (let s = 0; s < graph.V(); s++) {
      if (!this.marked[s]) {
        this.dfs(graph, s)
        this.count++
      }
    }
  }

  private dfs(graph: Graph, v: number) {
    this.marked[v] = true
    this.id[v] = this.count
    for (let w of graph.adjacent(v)) {
      if (!this.marked[w]) {
        this.dfs(graph, w)
      }
    }
  }

  connected(v: number, w: number): boolean {
    return this.id[v] === this.id[w]
  }

  getId(v: number): number {
    return this.id[v]
  }

  getCount(): number {
    return this.count
  }
}

const graph = new Graph(12)
graph
  .addEdge(0, 5)
  .addEdge(2, 4)
  .addEdge(2, 3)
  .addEdge(1, 2)
  .addEdge(0, 1)
  .addEdge(3, 4)
  .addEdge(3, 5)
  .addEdge(6, 0)
  .addEdge(6, 4)
  .addEdge(0, 2)
  .addEdge(7, 8)
  .addEdge(9, 10)
  .addEdge(9, 11)

const cc = new ConnectedComponents(graph)
console.log(cc.connected(3, 4))
