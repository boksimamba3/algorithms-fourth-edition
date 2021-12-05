import { Queue } from '../../fundamental-data-structures/queue'
import { DepthFirstOrder } from './depth-first-order'
import { Digraph } from './digraph'

/**
 * Using Kosaraju-Sharir algorithm for
 * computing strong components
 * */
export class StronglyConnectedComponents {
  private marked: boolean[]
  private id: number[]
  private count: number

  constructor(digraph: Digraph) {
    this.marked = Array.from<boolean>({ length: digraph.V() }).fill(
      false
    )
    this.id = Array.from({ length: digraph.V() })
    this.count = 0
    const order = new DepthFirstOrder(digraph.reverse())
    for (let v of order.getReversePostOrder()) {
      if (!this.marked[v]) {
        this.dfs(digraph, v)
        this.count++
      }
    }
  }

  private dfs(digraph: Digraph, v: number) {
    this.marked[v] = true
    this.id[v] = this.count
    for (let w of digraph.adjacent(v)) {
      if (!this.marked[w]) {
        this.dfs(digraph, w)
      }
    }
  }

  stronglyConnected(v: number, w: number): boolean {
    return this.id[v] === this.id[w]
  }

  getId(v: number): number {
    return this.id[v]
  }

  getCount(): number {
    return this.count
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

const scc = new StronglyConnectedComponents(digraph)
console.log(scc.stronglyConnected(3, 4))

// number of strongly connected components
const m = scc.getCount()
console.log(`${m} strong components`)

// compute list of vertices in each strong component
const components = new Queue<Queue<number>[]>()
for (let i = 0; i < m; i++) {
  components[i] = new Queue<number>()
}
for (let v = 0; v < digraph.V(); v++) {
  components[scc.getId(v)].enqueue(v)
}

// print results
for (let i = 0; i < m; i++) {
  const log = []
  for (let v of components[i]) {
    log.push(`${v}`)
  }
  console.log(log.join(' '))
}
