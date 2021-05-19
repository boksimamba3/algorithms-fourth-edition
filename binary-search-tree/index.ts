export class Node<T> {
  value: T
  left: Node<T>
  right: Node<T>

  constructor(value: T) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree<T> {
  root: Node<T> = null

  min(value: T): Node<T> {
    if (this.root === null) {
      return null
    }
    return this._min(this.root, value)
  }

  private _min(root: Node<T>, value: T): Node<T> {
    if (root.left === null) {
      return root
    }
    return this._min(root.left, value)
  }

  max(value: T): Node<T> {
    if (this.root === null) {
      return null
    }
    return this._max(this.root, value)
  }

  private _max(root: Node<T>, value: T): Node<T> {
    if (root.right === null) {
      return root
    }
    return this._max(root.right, value)
  }

  insert(value: T) {
    this.root = this._insert(this.root, value)
    return this
  }

  private _insert(root: Node<T>, value: T): Node<T> {
    if (root === null) {
      return new Node(value)
    }
    if (value <= root.value) {
      root.left = this._insert(root.left, value)
    }
    if (value > root.value) {
      root.right = this._insert(root.right, value)
    }
    return root
  }

  delete(value: T): Node<T> {
    return this._delete(this.root, value)
  }

  private _delete(root: Node<T>, value: T) {
    if (root === null) {
      return null
    } else if (value < root.value) {
      root.left = this._delete(root.left, value)
    } else if (value > root.value) {
      root.right = this._delete(root.right, value)
    } else {
      if (root.left === null) {
        return root.right
      } else if (root.right === null) {
        return root.left
      } else {
        const successor = this._min(root.right, value)
        root.value = successor.value
        root.right = this._delete(root.right, root.value)
      }
    }

    return root
  }

  search(value: T): boolean {
    const node = this._search(this.root, value)

    return node ? true : false
  }

  private _search(root: Node<T>, value: T): Node<T> {
    if (root === null) {
      return null
    }
    if (value === root.value) {
      return root
    }
    if (value <= root.value) {
      return this._search(root.left, value)
    }
    if (value > root.value) {
      return this._search(root.right, value)
    }
  }

  floor(value: T): T | null {
    let root = this.root
    let floorNode = null

    while (root != null) {
      if (value === root.value) {
        return root.value
      } else if (value < root.value) {
        root = root.left
      } else {
        floorNode = root
        root = root.right
      }
    }

    return floorNode ? floorNode.value : null
  }

  ceil(value: T): T | null {
    let root = this.root
    let ceilNode = null

    while (root != null) {
      if (value === root.value) {
        return root.value
      } else if (value < root.value) {
        ceilNode = root
        root = root.left
      } else {
        root = root.right
      }
    }

    return ceilNode ? ceilNode.value : null
  }

  inorder(iteratee: (node: Node<T>) => void) {
    this._inorder(this.root, iteratee)
  }

  _inorder(root: Node<T>, iteratee: (node: Node<T>) => void) {
    if (root === null) {
      return
    }
    this._inorder(root.left, iteratee)
    iteratee(root)
    this._inorder(root.right, iteratee)
  }
}

/* 
              15
            /    \
           5     20
          /     /  \
         3     18  80
                 \
                  16
*/
const bst = new BinarySearchTree<number>()
bst.insert(15).insert(5).insert(20).insert(3).insert(18).insert(80).insert(16)

console.log(bst.search(15)) // true
console.log(bst.search(25)) // false

// bst.inorder((node) => console.log(node.value))
console.log(bst.floor(15))
console.log(bst.floor(17))
console.log(bst.floor(2))
console.log(bst.ceil(17))
console.log(bst.ceil(4))
