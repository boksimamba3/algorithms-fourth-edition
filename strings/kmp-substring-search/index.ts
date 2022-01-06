export class KMP {
  private pattern: string
  private lps: number[] // longest prefix that is also a suffix

  constructor(pattern: string) {
    this.pattern = pattern
    // Compute table for prefix that is also suffix
    this.lps = Array.from<number>({
      length: pattern.length,
    }).fill(0)
    this.lps[0] = 0
    let i = 0

    for (let j = 1; j < pattern.length; j++) {
      while (i > 0 && pattern.charAt(j) !== pattern.charAt(i)) {
        i = this.lps[i - 1]
      }

      if (pattern.charAt(i) === pattern.charAt(j)) {
        i++
      }
      this.lps[j] = i
    }
  }

  search(text: string) {
    const n = text.length
    const m = pattern.length
    let i = 0
    let j = 0

    while (i < n) {
      if (pattern.charAt(j) === text.charAt(i)) {
        j++
        i++
      }
      if (j === m) {
        return i - j
      } else if (pattern.charAt(j) != text.charAt(i)) {
        if (j != 0) j = this.lps[j - 1]
        else i++
      }
    }

    return n
  }
}

const text = 'ababcabab'
const pattern = 'ababdabacdababcabab'
const kmp = new KMP(pattern)
console.log(kmp.search(text))
