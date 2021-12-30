export class Quick3Sort {
  private static charAt(s: string, d: number): number {
    return d < s.length ? s.charCodeAt(d) : -1
  }

  private static exchange(array: string[], i: number, j: number) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  private static _sort(
    a: string[],
    lo: number,
    hi: number,
    d: number
  ) {
    if (hi <= lo) return

    let lt = lo
    let gt = hi
    const v = Quick3Sort.charAt(a[lo], d)
    let i = lo + 1

    while (i <= gt) {
      const t = Quick3Sort.charAt(a[i], d)
      if (t < v) Quick3Sort.exchange(a, lt++, i++)
      else if (t > v) Quick3Sort.exchange(a, i, gt--)
      else i++
    }

    // a[lo...lt-1] < v = [lt...gt] < a[gt+1...hi]
    Quick3Sort._sort(a, lo, lt - 1, d)
    if (v >= 0) this._sort(a, lt, gt, d + 1)
    Quick3Sort._sort(a, gt + 1, hi, d)
  }

  public static sort(a) {
    Quick3Sort._sort(a, 0, a.length - 1, 0)
  }
}

const a = [
  'she',
  'shell',
  'seashells',
  'by',
  'the',
  'sea',
  'shore',
  'the',
  'shells',
  'the',
  'shells',
  'she',
  'sells',
  'are',
  'surely',
  'seashells',
]

Quick3Sort.sort(a)
console.log(a)
