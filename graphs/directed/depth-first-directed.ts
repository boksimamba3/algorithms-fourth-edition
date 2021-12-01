import { Digraph } from './digraph'

export class DepthFirstDirected {
  private marked: boolean[]

  constructor(digraph: Digraph, source: number | number[]) {
    this.marked = Array.from<boolean>({ length: digraph.V() }).fill(
      false
    )
    const sources = Array.isArray(source) ? source : [source]

    for (let s of sources) {
      if (!this.marked[s]) {
        this.dfs(digraph, s)
      }
    }
  }

  private dfs(digraph: Digraph, v: number) {
    this.marked[v] = true
    for (let w of digraph.adjacent(v)) {
      if (!this.marked[w]) {
        this.dfs(digraph, w)
      }
    }
  }

  hasPathTo(v: number): boolean {
    return this.marked[v]
  }
}

const digraph = new Digraph(13)
digraph
  .addEdge(4, 2)
  .addEdge(2, 3)
  .addEdge(3, 2)
  .addEdge(6, 0)
  .addEdge(0, 1)
  .addEdge(2, 0)
  .addEdge(11, 12)
  .addEdge(12, 9)
  .addEdge(9, 10)
  .addEdge(9, 11)
  .addEdge(7, 9)
  .addEdge(10, 12)
  .addEdge(11, 4)
  .addEdge(4, 3)
  .addEdge(3, 5)
  .addEdge(6, 8)
  .addEdge(8, 6)
  .addEdge(5, 4)
  .addEdge(0, 5)
  .addEdge(6, 4)
  .addEdge(6, 9)
  .addEdge(7, 6)

const dfd = new DepthFirstDirected(digraph, [1, 6])

console.log(dfd.hasPathTo(2))
console.log(dfd.hasPathTo(9))
