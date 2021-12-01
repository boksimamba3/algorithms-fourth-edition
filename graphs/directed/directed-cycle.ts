import { ArrayStack } from '../../fundamental-data-structures/array-stack'
import { Digraph } from './digraph'

export class DirectedCycle {
  private marked: boolean[]
  private edgeTo: number[]
  private cycle: ArrayStack<number> | null
  private onStack: boolean[]

  constructor(digraph: Digraph) {
    this.marked = Array.from<boolean>({ length: digraph.V() }).fill(
      false
    )
    this.onStack = Array.from<boolean>({ length: digraph.V() }).fill(
      false
    )
    this.edgeTo = Array.from({ length: digraph.V() })
    this.cycle = null
    for (let v = 0; v < digraph.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(digraph, v)
      }
    }
  }

  private dfs(digraph: Digraph, v: number) {
    this.onStack[v] = true
    this.marked[v] = true
    for (let w of digraph.adjacent(v)) {
      if (this.hasCycle()) {
        return
      } else if (!this.marked[w]) {
        this.edgeTo[w] = v
        this.dfs(digraph, w)
      } else if (this.onStack[w]) {
        this.cycle = new ArrayStack<number>()
        for (let x = v; x != w; x = this.edgeTo[x]) {
          this.cycle.push(x)
        }
        this.cycle.push(w)
        this.cycle.push(v)
      }
    }
    this.onStack[v] = false
  }

  hasCycle() {
    return this.cycle !== null
  }

  getCycle(): Iterable<number> {
    return this.cycle
  }
}

const digraph = new Digraph(6)
digraph.addEdge(0, 5).addEdge(5, 4).addEdge(4, 3).addEdge(3, 5)

const dc = new DirectedCycle(digraph)

console.log(dc.hasCycle())
for (let v of dc.getCycle()) {
  console.log(v)
}
