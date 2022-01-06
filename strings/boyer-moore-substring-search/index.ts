export class BoyerMoore {
  private right: number[]
  private pattern: string

  constructor(pattern: string) {
    this.pattern = pattern
    // Compute skip table
    const m = pattern.length
    const R = 256
    this.right = Array.from<number>({ length: R }).fill(-1)

    for (let j = 0; j < m; j++) {
      this.right[pattern.charCodeAt(j)] = j
    }
  }

  search(text: string) {
    const n = text.length
    const m = this.pattern.length
    let skip

    for (let i = 0; i <= n - m; i += skip) {
      skip = 0
      for (let j = m - 1; j >= 0; j--) {
        if (
          this.pattern.charCodeAt(j) != this.pattern.charCodeAt(i + j)
        ) {
          skip = j - this.right[text.charCodeAt(i + j)]
          if (skip > 1) skip = 1
          break
        }
      }
      if (skip === 0) return i
    }

    return n
  }
}

const text = 'ababcabab'
const pattern = 'ababdabacdababcabab'
const bm = new BoyerMoore(pattern)
console.log(bm.search(text))
