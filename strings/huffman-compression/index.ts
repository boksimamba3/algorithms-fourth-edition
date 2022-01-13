import { PQMin } from '../../sorting/priority-queue'

export type Nullable<T> = T | null

export class Node {
  char: string
  freq: number
  right: Nullable<Node>
  left: Nullable<Node>

  constructor(
    char: string,
    freq: number,
    left: Nullable<Node>,
    right: Nullable<Node>
  ) {
    this.char = char
    this.freq = freq
    this.left = left
    this.right = right
  }

  isLeaf(): boolean {
    return this.left === null && this.right === null
  }

  compareTo(that: Nullable<Node>): number {
    return this.freq - that.freq
  }
}

function toByteString(char: string): string {
  return char.charCodeAt(0).toString(2).padStart(8, '0')
}

function fromByteString(bytes: string): string {
  return String.fromCharCode(parseInt(bytes, 2))
}

const R = 256

export class Huffman {
  private static buildCode(
    st: string[],
    x: Node,
    s: string
  ): string[] {
    if (x.isLeaf()) {
      st[x.char.charCodeAt(0)] = s
      return
    }
    Huffman.buildCode(st, x.left, s + '0')
    Huffman.buildCode(st, x.right, s + '1')
  }

  private static buildTrie(freq: number[]): Node {
    const pq = new PQMin<Node>(15, (x: Node, y: Node) =>
      x.compareTo(y)
    )

    for (let c = 0; c < R; c++) {
      if (freq[c] > 0) {
        pq.insert(
          new Node(String.fromCharCode(c), freq[c], null, null)
        )
      }
    }

    while (pq.size() > 1) {
      const x = pq.delMin()
      const y = pq.delMin()
      const parent = new Node('\0', x.freq + y.freq, x, y)
      pq.insert(parent)
    }

    return pq.delMin()
  }

  static readTrie(encoded: string): Node {
    function decode(enc: string[]) {
      if (enc.shift() === '1') {
        const charBytes = enc.splice(0, 8).join('')
        return new Node(fromByteString(charBytes), 0, null, null)
      }

      const left = decode(enc)
      const right = decode(enc)

      return new Node('\0', 0, left, right)
    }

    return decode(encoded.split(''))
  }

  static writeTrie(x: Node): string {
    const encoded: string[] = []

    function encode(x: Node, enc: string[]) {
      if (x.isLeaf()) {
        enc.push('1')
        enc.push(toByteString(x.char))
        return
      }
      enc.push('0')
      encode(x.left, enc)
      encode(x.right, enc)
    }

    encode(x, encoded)

    return encoded.join('')
  }

  static expand(encodedTrie: string, compressedText: string) {
    const root = Huffman.readTrie(encodedTrie)
    const expanded: string[] = []
    let j
    for (let i = 0; i < compressedText.length; i = i + j) {
      j = 0
      let x = root
      while (!x.isLeaf()) {
        if (compressedText.charAt(i + j) === '1') x = x.right
        else x = x.left
        j++
      }
      expanded.push(x.char)
    }

    return expanded.join('')
  }

  static compress(input: string): [string, string] {
    const freq = Array.from<number>({ length: R }).fill(0)

    // Tabulate frequency count
    for (let i = 0; i < input.length; i++) {
      freq[input.charCodeAt(i)]++
    }
    // Build Huffman code trie
    const root = Huffman.buildTrie(freq)
    // Build code table
    const st = Array.from<string>({ length: R })
    Huffman.buildCode(st, root, '')

    // Write trie for decoder (recursive)
    const encodedTrie = Huffman.writeTrie(root)

    const compressedText: string[] = []
    for (let i = 0; i < input.length; i++) {
      const code = st[input[i].charCodeAt(0)]
      compressedText.push(code)
    }

    return [encodedTrie, compressedText.join('')]
  }
}

// Text with LF(\x0A) at the end
const text = 'it was the best of times it was the worst of times\x0A'
const [encodedTrie, compressedText] = Huffman.compress(text)
console.log(Huffman.expand(encodedTrie, compressedText))
