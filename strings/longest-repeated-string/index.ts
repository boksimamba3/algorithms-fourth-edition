import { Quick3Sort } from '../quick-3-string'

function lcp(x: string, y: string): number {
  const n = Math.min(x.length, y.length)
  for (let i = 0; i < n; i++) {
    if (x.charAt(i) != y.charAt(i)) {
      return i
    }
  }
  return n
}

export class LongestRepeatedString {
  static find(s: string) {
    const n = s.length

    const suffixes = Array.from<string>({ length: n })

    for (let i = 0; i < n; i++) {
      suffixes[i] = s.substring(i, n)
    }

    Quick3Sort.sort(suffixes)

    let lrs = ''
    for (let i = 0; i < n - 1; i++) {
      const len = lcp(suffixes[i], suffixes[i + 1])
      if (len > lrs.length) {
        lrs = suffixes[i].substring(0, len)
      }
    }

    return lrs
  }
}

const text = `it was the best of times it was the worst of times
it was the age of wisdom it was the age of foolishness
it was the epoch of belief it was the epoch of incredulity
it was the season of light it was the season of darkness
it was the spring of hope it was the winter of despair`

console.log(LongestRepeatedString.find(text))
