export interface Comparable<T> {
  compareTo(that: T): number
}

export class Suffix implements Comparable<Suffix> {
  text: string
  index: number

  constructor(text: string, index: number) {
    this.text = text
    this.index = index
  }

  static sort(x: Suffix, y: Suffix): number {
    return x.compareTo(y)
  }

  length(): number {
    return this.text.length - this.index
  }

  charAt(i: number): string {
    return this.text.charAt(this.index + i)
  }

  compareTo(that: Suffix): number {
    if (this == that) return 0
    const n = Math.min(this.length(), that.length())
    for (let i = 0; i < n; i++) {
      if (this.charAt(i) < that.charAt(i)) return -1
      if (this.charAt(i) > that.charAt(i)) return +1
    }

    return this.length() - that.length()
  }

  toString(): string {
    return this.text.substring(this.index)
  }
}

export class SuffixArray {
  suffixes: Suffix[]

  constructor(text: string) {
    const n = text.length
    this.suffixes = Array.from<Suffix>({ length: n })
    for (let i = 0; i < n; i++) {
      this.suffixes[i] = new Suffix(text, i)
    }
    this.suffixes.sort(Suffix.sort)
  }

  length(): number {
    return this.suffixes.length
  }

  index(i: number): number {
    if (i < 0 || i >= this.suffixes.length)
      throw 'IllegalArgumentException'

    return this.suffixes[i].index
  }

  select(i: number): string {
    if (i < 0 || i >= this.suffixes.length)
      throw 'IllegalArgumentException'

    return this.suffixes[i].toString()
  }

  lcp(i: number): number {
    if (i < 1 || i >= this.suffixes.length)
      throw 'IllegalArgumentException'

    return this.lcpSuffix(this.suffixes[i], this.suffixes[i - 1])
  }

  private lcpSuffix(s: Suffix, t: Suffix): number {
    const n = Math.min(s.length(), t.length())
    for (let i = 0; i < n; i++) {
      if (s.charAt(i) != t.charAt(i)) return i
    }

    return n
  }

  rank(query: string): number {
    let lo = 0
    let hi = this.suffixes.length - 1

    while (lo <= hi) {
      const mid = lo + (hi - lo) / 2
      const cmp = this.compare(query, this.suffixes[mid])
      if (cmp < 0) hi = mid - 1
      else if (cmp > 0) lo = mid + 1
      else return mid
    }

    return lo
  }

  private compare(query: string, suffix: Suffix) {
    const n = Math.min(query.length, suffix.length())
    for (let i = 0; i < n; i++) {
      if (query.charAt(i) < suffix.charAt(i)) return -1
      if (query.charAt(i) > suffix.charAt(i)) return +1
    }
    return query.length - suffix.length()
  }
}

const text = 'ABRACADABRA!'
const suffixArray = new SuffixArray(text)

suffixArray.suffixes.forEach((s) => console.log(`${s}`))
