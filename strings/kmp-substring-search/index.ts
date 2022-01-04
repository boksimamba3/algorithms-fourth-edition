export class KMP {
  private static computeLps(pattern: string) {
    const lps = Array.from<number>({
      length: pattern.length,
    }).fill(0)
    lps[0] = 0
    let i = 0

    for (let j = 1; j < pattern.length; j++) {
      while (i > 0 && pattern.charAt(j) !== pattern.charAt(i)) {
        i = lps[i - 1]
      }

      if (pattern.charAt(i) === pattern.charAt(j)) {
        i++
      }
      lps[j] = i
    }

    return lps
  }

  static search(pattern: string, text: string) {
    const n = text.length
    const m = pattern.length
    const lps = KMP.computeLps(pattern)
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
        if (j != 0) j = lps[j - 1]
        else i++
      }
    }

    return n
  }
}

const text = 'ababcabab'
const pattern = 'ababdabacdababcabab'
console.log(KMP.search(pattern, text))
