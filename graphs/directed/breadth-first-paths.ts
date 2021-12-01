import { Digraph } from './digraph'
import { ArrayStack } from '../../fundamental-data-structures/array-stack'
import { Queue } from '../../fundamental-data-structures/queue'

export class BreadthFirstPath {
  private marked: boolean[]
  private edgeTo: number[]
  private source: number

  constructor(digraph: Digraph, source: number) {
    this.source = source
    this.marked = Array.from<boolean>({ length: digraph.V() }).fill(
      false
    )
    this.edgeTo = Array.from({ length: digraph.V() })
    this.bfs(digraph, source)
  }

  private bfs(digraph: Digraph, source: number) {
    const queue = new Queue<number>()
    queue.enqueue(source)
    this.marked[source] = true

    while (!queue.isEmpty()) {
      const v = queue.dequeue()
      for (let w of digraph.adjacent(v)) {
        if (!this.marked[w]) {
          this.marked[w] = true
          this.edgeTo[w] = v
          queue.enqueue(w)
        }
      }
    }
  }

  hasPathTo(v: number): boolean {
    return this.marked[v]
  }

  pathTo(v: number): Iterable<number> {
    if (!this.hasPathTo(v)) return null

    const path = new ArrayStack()
    for (let x = v; x != this.source; x = this.edgeTo[x]) {
      path.push(x)
    }
    path.push(this.source)

    return path
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

const bfp = new BreadthFirstPath(digraph, 0)

console.log(Array.from(bfp.pathTo(2)))
