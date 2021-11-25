import { Graph } from './graph'
import { ArrayStack } from '../../fundamental-data-structures/array-stack'
import { Queue } from '../../fundamental-data-structures/queue'

export class BreadthFirstPath {
  private marked: boolean[]
  private edgeTo: number[]
  private source: number

  constructor(graph: Graph, source: number) {
    this.source = source
    this.marked = Array.from({ length: graph.V() })
    this.edgeTo = Array.from({ length: graph.V() })
    this.bfs(graph, source)
  }

  private bfs(graph: Graph, source: number) {
    const queue = new Queue<number>()
    queue.enqueue(source)
    this.marked[source] = true

    while (!queue.isEmpty()) {
      const v = queue.dequeue()
      for (let w of graph.adjacent(v)) {
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

const graph = new Graph(6)
graph
  .addEdge(0, 5)
  .addEdge(2, 4)
  .addEdge(2, 3)
  .addEdge(1, 2)
  .addEdge(0, 1)
  .addEdge(3, 4)
  .addEdge(3, 5)
  .addEdge(0, 2)

const dfp = new BreadthFirstPath(graph, 0)

console.log(Array.from(dfp.pathTo(4)))
