import { ArrayStack } from '../../fundamental-data-structures/array-stack'
import { Queue } from '../../fundamental-data-structures/queue'
import { Digraph } from './digraph'

export class DepthFirstOrder {
  private pre: number[]
  private post: number[]
  private postOrder: Queue<number>
  private preOrder: Queue<number>
  private marked: boolean[]
  private preOrderCounter: number
  private postOrderCounter: number

  constructor(digraph: Digraph) {
    this.pre = Array.from({ length: digraph.V() })
    this.post = Array.from({ length: digraph.V() })
    this.postOrder = new Queue<number>()
    this.preOrder = new Queue<number>()
    this.marked = Array.from<boolean>({ length: digraph.V() }).fill(
      false
    )
    this.preOrderCounter = 0
    this.postOrderCounter = 0

    for (let v = 0; v < digraph.V(); v++) {
      if (!this.marked[v]) {
        this.dfs(digraph, v)
      }
    }
  }

  private dfs(digraph: Digraph, v: number) {
    this.marked[v] = true
    this.preOrder.enqueue(v)
    this.pre[v] = this.preOrderCounter++
    for (let w of digraph.adjacent(v)) {
      if (!this.marked[w]) {
        this.dfs(digraph, w)
      }
    }
    this.postOrder.enqueue(v)
    this.post[v] = this.postOrderCounter++
  }

  getPre(v: number): number {
    return this.pre[v]
  }

  getPost(v: number): number {
    return this.post[v]
  }

  getPreOrder(): Iterable<number> {
    return this.preOrder
  }

  getPostOrder(): Iterable<number> {
    return this.postOrder
  }

  getReversePostOrder(): Iterable<number> {
    const stack = new ArrayStack<number>()
    for (let v of this.postOrder) {
      stack.push(v)
    }

    return stack
  }
}

function printVertices(iter: Iterable<number>, label?: string) {
  const vertices = []
  for (let v of iter) {
    vertices.push(v)
  }
  console.log(`${label} [${vertices.join(', ')}]`)
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

const dfo = new DepthFirstOrder(digraph)

printVertices(dfo.getPreOrder(), 'Pre Order:')
printVertices(dfo.getPostOrder(), 'Post Order:')
printVertices(dfo.getReversePostOrder(), 'Reverse Post Order:')
