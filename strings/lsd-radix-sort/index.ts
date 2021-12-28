export class LSDRadixSort {
  static sort(a: string[], W: number) {
    const R = 256
    const N = a.length
    const aux = Array.from<string>({ length: a.length })

    for (let d = W - 1; d >= 0; d--) {
      const count = Array.from<number>({ length: R + 1 }).fill(0)

      for (let i = 0; i < N; i++) {
        count[a[i].charCodeAt(d) + 1]++
      }

      for (let r = 0; r < R; r++) {
        count[r + 1] += count[r]
      }

      for (let i = 0; i < N; i++) {
        aux[count[a[i].charCodeAt(d)]++] = a[i]
      }

      for (let i = 0; i < N; i++) {
        a[i] = aux[i]
      }
    }
  }
}

const a = ['dab', 'cab', 'bad', 'dad', 'ace', 'add', 'fee', 'bee']
LSDRadixSort.sort(a, 3)
console.log(a)
