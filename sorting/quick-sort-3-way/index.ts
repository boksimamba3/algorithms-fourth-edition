export class QuickSort {
  static sort(array: number[], lo: number, hi: number) {
    if (hi <= lo) {
      return
    }
    let lt = lo
    let i = lo + 1
    let gt = hi
    const v = array[lo]
    while (i <= gt) {
      const cmp = array[i] - v
      if (cmp < 0) QuickSort.exchange(array, lt++, i++)
      else if (cmp > 0) QuickSort.exchange(array, i, gt--)
      else i++
    }
    QuickSort.sort(array, lo, lt - 1)
    QuickSort.sort(array, gt + 1, hi)
  }

  static partition(array: number[], lo: number, hi: number): number {
    let i = lo
    let j = hi + 1
    const v = array[lo]
    while (true) {
      while (QuickSort.less(array[++i], v)) if (i === hi) break
      while (QuickSort.less(v, array[--j])) if (j === lo) break
      if (i >= j) break
      QuickSort.exchange(array, i, j)
    }
    QuickSort.exchange(array, lo, j)

    return j
  }

  static less<T>(a: number, b: number) {
    return a < b
  }

  static exchange(array: number[], i: number, j: number) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  static isSorted<T>(array: T[]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] < array[i - 1]) {
        return false
      }
    }

    return true
  }
}

const array = [10, 15, 1, 2, 9, 4, 5, 3]
QuickSort.sort(array, 0, array.length - 1)
console.log(array)
console.log('Sorted:', QuickSort.isSorted(array))
